import { PublicationsService } from './publications/publications.service';
import { PertinenceService } from './script/api/datagouv/pertinence';
export declare class AppController {
    private readonly publications;
    private readonly pertinence;
    constructor(publications: PublicationsService, pertinence: PertinenceService);
    health(): {
        status: string;
    };
    list(issuer?: string, subtype?: string, from?: string, to?: string, limit?: string, offset?: string): Promise<{
        total: number;
        limit: number;
        offset: number;
        items: {
            url: string | null;
            id: string;
            issuer: string | null;
            isin: string | null;
            cac40: boolean;
            type: string | null;
            subtype: string | null;
            status: string | null;
            relatedTo: string | null;
            title: string | null;
            publishedAt: Date;
            createdAt: Date;
        }[];
    }>;
    subtypes(): Promise<{
        subtype: string;
        count: number;
    }[]>;
    top(): any;
}
