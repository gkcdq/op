import api from "../api_Bridge";

export interface BriefResponse
{
    id: number;
    isin: string;
    publishedAt: string;
    documentUrl: string;
    status: 'OK' | 'PARTIEL';
    briefJson: {
        societe: string;
        titre: string;
        breve: string;
        chiffres_cles: string[];
    };
    error: string | null;
}

export const fetchBriefs = async (): Promise<BriefResponse[]> => {
    const response = await api.get<BriefResponse[]>('/brief');
    return response.data;
};