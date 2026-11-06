import { PrismaService } from '../../prisma/prisma.service';
export interface ListFilters {
    issuer?: string;
    subtype?: string;
    from?: string;
    to?: string;
    limit?: number;
    offset?: number;
}
export declare class PublicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(filters?: ListFilters): Promise<{
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
}
