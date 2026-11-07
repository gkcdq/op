import { PrismaService } from '../../../prisma/prisma.service';
import type { publication as Publication } from '../../../prisma/generated/client';
export declare function calculerPoints(pub: Pick<Publication, 'subtype' | 'title' | 'cac40'>): {
    points: number;
    raisons: string[];
};
export interface PublicationNotee {
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
export declare class PertinenceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private dernierTop;
    actualiser(nombre?: number): Promise<PublicationNotee[]>;
    getTop(): PublicationNotee[];
    classement(jours?: number): Promise<PublicationNotee[]>;
    private lirePublications;
    private retirerLesInutiles;
    private noter;
    private trier;
    private unSeulParSociete;
}
