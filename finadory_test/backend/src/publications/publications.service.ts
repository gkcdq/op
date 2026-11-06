import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface ListFilters
{
    issuer?: string;
    subtype?: string;  
    from?: string;     
    to?: string;      
    limit?: number;
    offset?: number;
}

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;
const MS_PER_DAY = 86_400_000;

// "2026-11-05" -> début de ce jour (UTC). Erreur 400 si le format est faux.
function parseDay(value: string, name: string): Date
{
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
        throw new BadRequestException(`"${name}" doit être au format AAAA-MM-JJ`);
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime()))
        throw new BadRequestException(`"${name}" n'est pas une date valide`);
    return date;
}

@Injectable()
export class PublicationsService
{
    constructor(private readonly prisma: PrismaService) {}

    async list(filters: ListFilters = {})
    {
        // Date : [from ; to + 1 jour[  => le jour "to" est bien inclus en entier.
        const publishedAt: { gte?: Date; lt?: Date } = {};
        if (filters.from)
            publishedAt.gte = parseDay(filters.from, 'from');
        if (filters.to)
            publishedAt.lt = new Date(parseDay(filters.to, 'to').getTime() + MS_PER_DAY);

        const where = {
            issuer: filters.issuer ? { contains: filters.issuer, mode: 'insensitive' as const } : undefined,
            subtype: filters.subtype || undefined,
            publishedAt: filters.from || filters.to ? publishedAt : undefined,
        };

        const limit = Math.min(Math.max(filters.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
        const offset = Math.max(filters.offset ?? 0, 0);

        // Le total (pour la pagination) et la page sont lus ensemble.
        const [total, items] = await this.prisma.$transaction([
            this.prisma.publication.count({ where }),
            this.prisma.publication.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                take: limit,
                skip: offset,
            }),
        ]);

        return { total, limit, offset, items };
    }

    // Valeurs possibles du filtre "type d'information", avec leur effectif.
    async subtypes()
    {
        const groups = await this.prisma.publication.groupBy({
            by: ['subtype'],
            _count: { _all: true },
        });
        return groups
            .map((g) => ({ subtype: g.subtype, count: g._count._all }))
            .sort((a, b) => b.count - a.count);
    }
}