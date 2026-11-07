import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import type { publication as Publication } from '../../../prisma/generated/client';

const TYPES_IGNORES = [
    'Total du nombre de droits de vote et du capital',
    "Acquisition ou cession des actions de l'émetteur",
    "Etat membre d'origine",
    "Modalités de mise à disposition des documents préparatoires à l'AG",
    'Modalités de mise à disposition de prospectus',
    'Modalités de mise à disposition de document de référence ou de ses actualisations',
];

const POINTS_PAR_TYPE: Record<string, number> = {
    "Communiqués publiés en période d'offre publique d'acquisition": 100,
    'Information financière trimestrielle': 70,
    "Rapports financiers et d'audit semestriels/examens réduits": 60,
    'Décision de franchissement de seuil': 45,
    'Informations privilégiées': 40,
};
const POINTS_TYPE_PAR_DEFAUT = 10;

const MOTS_CLES: { motif: RegExp; points: number; raison: string }[] = [
    { motif: /r[ée]sultats?|results?|chiffre d.affaires|turnover|revenues?/i, points: 20, raison: 'résultats ou chiffre d\'affaires' },
    { motif: /acquisition|cession|offre publique|tender offer|fusion|merger/i, points: 25, raison: 'rachat, fusion ou offre' },
    { motif: /dividendes?|dividends?/i, points: 15, raison: 'dividende' },
    { motif: /objectifs?|guidance|pr[ée]visions?|outlook/i, points: 15, raison: 'prévisions' },
    { motif: /mise (?:à|a) disposition|made available/i, points: -30, raison: 'simple avis de mise à disposition' },
];

const MOTIF_MONTANT = /\d[\d\s.,]*\s?(%|M€|M EUR|millions?|milliards?|€|EUR)/i;

export function calculerPoints(pub: Pick<Publication, 'subtype' | 'title' | 'cac40'>)
{
    const titre = pub.title ?? '';
    let points = POINTS_PAR_TYPE[pub.subtype ?? ''] ?? POINTS_TYPE_PAR_DEFAUT;
    const raisons = [`type "${pub.subtype}" : ${points}`];
    for (const regle of MOTS_CLES)
    {
        if (regle.motif.test(titre))
        {
            points += regle.points;
            raisons.push(`${regle.raison} : ${regle.points > 0 ? '+' : ''}${regle.points}`);
        }
    }
    if (MOTIF_MONTANT.test(titre))
    {
        points += 10;
        raisons.push('montant dans le titre : +10');
    }
    if (pub.cac40)
    {
        points += 15;
        raisons.push('société du CAC 40 : +15');
    }
    return { points, raisons };
}

function estFrancais(titre: string): boolean
{
    if (/[àâçéèêëîïôûùüœ]/i.test(titre))
        return true;
    return /(^|[\s'’])(le|la|les|de|du|des|et|en|au|aux|un|une|sur|pour|par|dans|d|l)(?=[\s'’]|$)/i.test(titre);
}

export interface PublicationNotee
{
    id: string;
    societe: string | null;
    titre: string | null;
    type: string | null;
    date: Date;
    url: string | null;
    francais: boolean;
    points: number;
    raisons: string[];
}

@Injectable()
export class PertinenceService
{
    // Injection propre : on ne dépend QUE de Prisma
    constructor(private readonly prisma: PrismaService) {}

    private dernierTop: { calculeLe: Date | null; top: PublicationNotee[] } = { calculeLe: null, top: [] };

    async actualiser(nombre = 5) {
        const liste = await this.classement();
        const top = liste.slice(0, nombre);
        this.dernierTop = { calculeLe: new Date(), top };
        return top;
    }

    getTop(): PublicationNotee[] {
        return this.dernierTop.top;
    }

    async classement(jours = 3): Promise<PublicationNotee[]> {
        const publications = await this.lirePublications(jours);
        const candidates = this.retirerLesInutiles(publications);
        const notees = this.noter(candidates);
        this.trier(notees);
        return this.unSeulParSociete(notees);
    }

    private lirePublications(jours: number): Promise<Publication[]> {
        const debut = new Date(Date.now() - jours * 86_400_000);
        return this.prisma.publication.findMany({
            where: { publishedAt: { gte: debut } },
            orderBy: { publishedAt: 'desc' },
        });
    }

    private retirerLesInutiles(publications: Publication[]): Publication[] {
        const DECLARATION_RACHAT = /actions propres|programme de rachat|share buyback|treasury shares/i;
        const maintenant = new Date();
        return publications.filter((p) =>
            !DECLARATION_RACHAT.test(p.title ?? '') &&
            p.publishedAt <= maintenant &&
            (!p.status || p.status === 'NEW') &&
            !TYPES_IGNORES.includes(p.subtype ?? '') &&
            p.url !== null,
        );
    }

    private noter(publications: Publication[]): PublicationNotee[] {
        return publications.map((p) => ({
            id: p.id,
            societe: p.issuer,
            titre: p.title,
            type: p.subtype,
            date: p.publishedAt,
            url: p.url,
            francais: estFrancais(p.title ?? ''),
            ...calculerPoints(p),
        }));
    }

    private trier(notees: PublicationNotee[]): void {
        notees.sort((a, b) =>
            b.points - a.points ||
            Number(b.francais) - Number(a.francais) ||
            b.date.getTime() - a.date.getTime(),
        );
    }

    private unSeulParSociete(notees: PublicationNotee[]): PublicationNotee[] {
        const dejaVues = new Set<string>();
        return notees.filter((p) => {
            const societe = p.societe ?? p.id;
            if (dejaVues.has(societe)) return false;
            dejaVues.add(societe);
            return true;
        });
    }
}