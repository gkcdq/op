"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = normalize;
exports.fetchPeriod = fetchPeriod;
const API_URL = process.env.INFOFI_BASE_URL;
const DATASET = process.env.INFOFI_DATASET_ID;
const PAGE_SIZE = 100;
const MAX_RESULTS = 10_000;
const MS_PER_DAY = 86_400_000;
function cleanText(value) {
    const text = (value ?? '').toString().trim();
    return text === '' ? null : text;
}
function toValidDate(value) {
    if (!value)
        return null;
    const date = new Date(value);
    const isUnreadable = Number.isNaN(date.getTime());
    const isPlaceholder = date.getUTCFullYear() >= 8000;
    if (isUnreadable || isPlaceholder)
        return null;
    return date.toISOString();
}
function normalize(record) {
    const fields = record?.record?.fields;
    if (!fields)
        return { reason: 'structure_inattendue' };
    const uin = cleanText(fields.uin_idt_uin);
    if (!uin)
        return { reason: 'uin_manquant' };
    const publishedAt = toValidDate(fields.uin_dat_mar) ?? toValidDate(fields.uin_dat_amf);
    if (!publishedAt)
        return { reason: 'date_invalide' };
    const broadcaster = cleanText(fields.identificationdiffuseur_idi_cod_dif);
    const id = broadcaster ? `${broadcaster}-${uin}` : uin;
    return {
        pub: {
            id,
            issuer: cleanText(fields.identificationsociete_iso_nom_soc),
            isin: cleanText(fields.identificationsociete_iso_cd_isi),
            cac40: fields.cac40 === '1' || fields.cac40 === 1,
            type: cleanText(fields.type_d_information),
            subtype: cleanText(fields.sous_type_d_information),
            status: cleanText(fields.informationdeposee_inf_upg_inf_inf_upg_sts),
            relatedTo: cleanText(fields.informationdeposee_inf_upg_inf_inf_upg_rel),
            title: cleanText(fields.informationdeposee_inf_tit_inf),
            publishedAt,
            url: cleanText(fields.url_de_recuperation),
        },
    };
}
function getStartDate(days) {
    const start = new Date(Date.now() - days * MS_PER_DAY);
    return start.toISOString().slice(0, 10);
}
async function fetchPage(startDate, offset) {
    const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(offset),
        order_by: 'uin_dat_amf desc',
        where: `uin_dat_amf >= date'${startDate}'`,
    });
    const url = `${API_URL}/catalog/datasets/${DATASET}/records?${params}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`InfoFinanciere HTTP ${response.status} : ${await response.text()}`);
    }
    const body = await response.json();
    return body.records ?? [];
}
async function fetchPeriod(days = 3) {
    const since = getStartDate(days);
    const publications = [];
    const reasons = {};
    let fetched = 0;
    let truncated = true;
    for (let offset = 0; offset + PAGE_SIZE <= MAX_RESULTS; offset += PAGE_SIZE) {
        const records = await fetchPage(since, offset);
        for (const record of records) {
            fetched++;
            const { pub, reason } = normalize(record);
            if (pub)
                publications.push(pub);
            else
                reasons[reason] = (reasons[reason] ?? 0) + 1;
        }
        if (records.length < PAGE_SIZE) {
            truncated = false;
            break;
        }
    }
    return { since, fetched, rejected: fetched - publications.length, reasons, truncated, publications };
}
//# sourceMappingURL=infoFinanciere.js.map