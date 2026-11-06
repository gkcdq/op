"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;
const MS_PER_DAY = 86_400_000;
function parseDay(value, name) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
        throw new common_1.BadRequestException(`"${name}" doit être au format AAAA-MM-JJ`);
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime()))
        throw new common_1.BadRequestException(`"${name}" n'est pas une date valide`);
    return date;
}
let PublicationsService = class PublicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(filters = {}) {
        const publishedAt = {};
        if (filters.from)
            publishedAt.gte = parseDay(filters.from, 'from');
        if (filters.to)
            publishedAt.lt = new Date(parseDay(filters.to, 'to').getTime() + MS_PER_DAY);
        const where = {
            issuer: filters.issuer ? { contains: filters.issuer, mode: 'insensitive' } : undefined,
            subtype: filters.subtype || undefined,
            publishedAt: filters.from || filters.to ? publishedAt : undefined,
        };
        const limit = Math.min(Math.max(filters.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
        const offset = Math.max(filters.offset ?? 0, 0);
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
    async subtypes() {
        const groups = await this.prisma.publication.groupBy({
            by: ['subtype'],
            _count: { _all: true },
        });
        return groups
            .map((g) => ({ subtype: g.subtype, count: g._count._all }))
            .sort((a, b) => b.count - a.count);
    }
};
exports.PublicationsService = PublicationsService;
exports.PublicationsService = PublicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PublicationsService);
//# sourceMappingURL=publications.service.js.map