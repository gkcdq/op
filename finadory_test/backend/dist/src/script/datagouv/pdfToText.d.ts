export interface TextePdf {
    texte: string;
    texteVerification: string;
    lisible: boolean;
    tronque: boolean;
    pagesTotal: number;
    pagesRetenues: number;
    erreur?: string;
}
export declare function extraireTextePdf(url: string): Promise<TextePdf>;
export declare function normaliser(s: string): string;
