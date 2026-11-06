"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraireTextePdf = extraireTextePdf;
exports.normaliser = normaliser;
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const promises_1 = require("node:fs/promises");
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
const DOMAINE_AUTORISE = 'fr.ftp.opendatasoft.com';
const TAILLE_MAX = 10 * 1024 * 1024;
const DELAI_MS = 20_000;
const TEXTE_MIN = 200;
const TEXTE_MAX = 3_000;
async function extraireTextePdf(url) {
    let dossier;
    try {
        const hostname = new URL(url).hostname;
        if (hostname !== DOMAINE_AUTORISE)
            return vide(`domaine non autorisé : ${hostname}`);
        const reponse = await fetch(url, { signal: AbortSignal.timeout(DELAI_MS) });
        if (!reponse.ok)
            return vide(`téléchargement impossible : HTTP ${reponse.status}`);
        const type = reponse.headers.get('content-type') ?? '';
        if (type && !type.includes('pdf') && !type.includes('octet-stream'))
            return vide(`type non supporté : ${type}`);
        const annonce = Number(reponse.headers.get('content-length') ?? 0);
        if (annonce > TAILLE_MAX)
            return vide(`PDF trop volumineux : ${Math.round(annonce / 1024 / 1024)} Mo`);
        const octets = Buffer.from(await reponse.arrayBuffer());
        if (octets.length > TAILLE_MAX)
            return vide(`PDF trop volumineux : ${Math.round(octets.length / 1024 / 1024)} Mo`);
        if (octets.subarray(0, 5).toString('latin1') !== '%PDF-')
            return vide('le fichier téléchargé n\'est pas un PDF');
        dossier = await (0, promises_1.mkdtemp)((0, node_path_1.join)((0, node_os_1.tmpdir)(), 'pdf-'));
        const fichier = (0, node_path_1.join)(dossier, 'document.pdf');
        await (0, promises_1.writeFile)(fichier, octets);
        const layout = await lancerPdftotext(['-enc', 'UTF-8', '-layout', fichier, '-']);
        const pages = layout.split('\f');
        if (pages.at(-1)?.trim() === '')
            pages.pop();
        const pagesTotal = pages.length;
        const pagesLlm = pages.map(nettoyerPourLlm);
        const pagesVerif = pages.map(nettoyerPourVerification);
        let total = 0;
        let retenues = 0;
        for (const page of pagesLlm) {
            if (retenues > 0 && total + page.length > TEXTE_MAX)
                break;
            total += page.length;
            retenues++;
        }
        let texte = pagesLlm.slice(0, retenues).join('\n\n');
        let texteVerification = pagesVerif.slice(0, retenues).join('\n\n');
        let tronque = retenues < pagesTotal;
        if (texte.length > TEXTE_MAX) {
            texte = couperALaLigne(texte, TEXTE_MAX);
            texteVerification = couperALaLigne(texteVerification, TEXTE_MAX);
            tronque = true;
        }
        return {
            texte,
            texteVerification,
            lisible: texte.length >= TEXTE_MIN,
            tronque,
            pagesTotal,
            pagesRetenues: retenues,
        };
    }
    catch (error) {
        const e = error;
        if (e.code === 'ENOENT')
            return vide('pdftotext introuvable : installer poppler-utils (apt install poppler-utils)');
        return vide(e.message);
    }
    finally {
        if (dossier)
            await (0, promises_1.rm)(dossier, { recursive: true, force: true });
    }
}
async function lancerPdftotext(args) {
    const { stdout } = await execFileAsync('pdftotext', args, {
        timeout: DELAI_MS,
        maxBuffer: 20 * 1024 * 1024,
    });
    return stdout.replace(/\r/g, '');
}
function normaliser(s) {
    return s
        .normalize('NFKC')
        .replace(/\u00ad/g, '')
        .replace(/[\u2010-\u2015\u2212]/g, '-')
        .replace(/[\u00a0\u202f\u2009\u2007]/g, ' ')
        .replace(/[\u2018\u2019\u02bc]/g, '\'')
        .replace(/[\u201c\u201d]/g, '"')
        .replace(/[\u200b\u200c\u200d\ufeff]/g, '')
        .replace(/[\u2022\u25cf\u25aa\uf0b7]/g, '•')
        .replace(/([+-]) +(?=\d)/g, '$1');
}
function nettoyerPourLlm(page) {
    return normaliser(page)
        .split('\n')
        .map((l) => l.trim().replace(/ {3,}/g, ' | '))
        .join('\n')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
function nettoyerPourVerification(page) {
    return nettoyerPourLlm(page)
        .replace(/(?<!,\d*)(?<=\d) (?=\d{3}(?!\d))/g, '');
}
function couperALaLigne(s, max) {
    if (s.length <= max)
        return s;
    const coupe = s.lastIndexOf('\n', max);
    return s.slice(0, coupe > 0 ? coupe : max);
}
function vide(erreur) {
    return {
        texte: '',
        texteVerification: '',
        lisible: false,
        tronque: false,
        pagesTotal: 0,
        pagesRetenues: 0,
        erreur,
    };
}
//# sourceMappingURL=pdfToText.js.map