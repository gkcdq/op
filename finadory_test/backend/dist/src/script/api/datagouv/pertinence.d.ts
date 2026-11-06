import { PrismaService } from '../../../../prisma/prisma.service';
export declare function calculerPoints(pub: {
    subtype: string | null;
    title: string | null;
    cac40: boolean;
}): {
    points: number;
    raisons: string[];
};
export declare class PertinenceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private dernierTop;
    actualiser(nombre?: number): Promise<{
        points: number;
        raisons: string[];
        id: any;
        societe: any;
        titre: any;
        type: any;
        date: Date;
        url: any;
        francais: boolean;
    }[]>;
    getTop(): any;
    classement(jours?: number): Promise<{
        points: number;
        raisons: string[];
        id: any;
        societe: any;
        titre: any;
        type: any;
        date: Date;
        url: any;
        francais: boolean;
    }[]>;
    private lirePublications;
    private retirerLesInutiles;
    private noter;
    private trier;
    private unSeulParSociete;
}
