export interface Publication {
    id: string;
    issuer: string | null;
    isin: string | null;
    cac40: boolean;
    type: string | null;
    subtype: string | null;
    status: string | null;
    relatedTo: string | null;
    title: string | null;
    publishedAt: string;
    url: string | null;
}
export declare function normalize(record: any): {
    pub?: Publication;
    reason?: string;
};
export declare function fetchPeriod(days?: number): Promise<{
    since: string;
    fetched: number;
    rejected: number;
    reasons: Record<string, number>;
    truncated: boolean;
    publications: Publication[];
}>;
