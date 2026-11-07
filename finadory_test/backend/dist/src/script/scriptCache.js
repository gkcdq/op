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
var ScriptCache_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptCache = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const schedule_1 = require("@nestjs/schedule");
let ScriptCache = ScriptCache_1 = class ScriptCache {
    prisma;
    logger = new common_1.Logger(ScriptCache_1.name);
    brief = [];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onApplicationBootstrap() {
        await this.refreshCache();
    }
    async refreshCache() {
        this.logger.log("Rafraîchissement du cache des brèves...");
        try {
            const dernieresBreves = await this.prisma.llmVerification.findMany({
                where: {
                    status: { in: ['OK', 'PARTIEL'] }
                },
                orderBy: {
                    publishedAt: 'desc'
                },
                take: 5
            });
            this.brief = dernieresBreves;
            this.logger.log(`Cache mis à jour avec ${this.brief.length} brèves.`);
        }
        catch (error) {
            this.logger.error("Erreur lors du rafraîchissement du cache", error);
        }
    }
    getBriefs() { return this.brief; }
    getFilteredBriefs(search) {
        if (!search)
            return this.brief;
        const query = search.toLowerCase();
        return this.brief.filter(b => (b.briefJson.societe && b.briefJson.societe.toLowerCase().includes(query)) ||
            (b.briefJson.titre && b.briefJson.titre.toLowerCase().includes(query)));
    }
};
exports.ScriptCache = ScriptCache;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_5_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScriptCache.prototype, "refreshCache", null);
exports.ScriptCache = ScriptCache = ScriptCache_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScriptCache);
//# sourceMappingURL=scriptCache.js.map