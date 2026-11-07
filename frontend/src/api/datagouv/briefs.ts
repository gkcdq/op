import api from "../api_Bridge";

export interface ChiffreCle {
    label: string;
    valeur: string;
}

export interface BriefResponse {
    id: number;
    isin: string;
    publishedAt: string;
    documentUrl: string;
    status: 'OK' | 'PARTIEL';
    briefJson: {
        societe: string;
        titre: string;
        breve: string;
        chiffres_cles: ChiffreCle[];
    };
    error: string | null;
}

export const fetchBriefs = async (search = ''): Promise<BriefResponse[]> => {
    const response = await api.get<BriefResponse[]>('/brief', {
        params: { search }
    });
    console.log(response.data);
    return response.data;
};