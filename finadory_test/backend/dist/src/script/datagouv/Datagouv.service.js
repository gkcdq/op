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
var DatagouvIngestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatagouvIngestService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const infoFinanciere_1 = require("../../api/datagouv/infoFinanciere");
const pertinence_1 = require("./pertinence");
const briefAgent_1 = require("../../api/ia/briefAgent");
const scriptCache_1 = require("../scriptCache");
const DAYS = 3;
const BATCH_SIZE = 500;
const INTERVAL_MS = 30 * 60_000;
const TOP_SIZE = 5;
let DatagouvIngestService = DatagouvIngestService_1 = class DatagouvIngestService {
    prisma;
    pertinence;
    briefService;
    scriptCache;
    logger = new common_1.Logger(DatagouvIngestService_1.name);
    timer;
    cycleEnCours = false;
    top5publicationsTab = [];
    constructor(prisma, pertinence, briefService, scriptCache) {
        this.prisma = prisma;
        this.pertinence = pertinence;
        this.briefService = briefService;
        this.scriptCache = scriptCache;
    }
    onApplicationBootstrap() {
        if (process.env.SCRIPT_DATAGOUVE_INFOFINANCIERE != "true")
            return;
        this.cycle();
        this.timer = setInterval(() => this.cycle(), INTERVAL_MS);
    }
    onModuleDestroy() {
        if (this.timer)
            clearInterval(this.timer);
    }
    async cycle() {
        if (this.cycleEnCours) {
            this.logger.warn('Cycle précédent encore en cours : celui-ci est ignoré');
            return;
        }
        this.cycleEnCours = true;
        try {
            await this.executerIngestion();
            await this.executerClassement();
        }
        finally {
            this.cycleEnCours = false;
        }
    }
    async executerIngestion() {
        try {
            await this.ingest();
        }
        catch (error) {
            this.logger.error(`Ingestion échouée : ${error}`);
        }
    }
    async executerClassement() {
        try {
            const top = await this.pertinence.actualiser(TOP_SIZE);
            this.top5publicationsTab = top;
            this.logger.log(`Top ${top.length} :`);
            for (const p of top) {
                this.logger.log(`  ${p.points} pts | ${p.societe} | ${p.titre}`);
                await this.briefService.genererBrief(p);
            }
            await this.scriptCache.refreshCache();
        }
        catch (error) {
            this.logger.error(`Classement échoué : ${error}`);
        }
    }
    async ingest() {
        this.logger.log(`Ingestion des ${DAYS} derniers jours...`);
        const result = await (0, infoFinanciere_1.fetchPeriod)(DAYS);
        const rows = result.publications.map((p) => ({
            ...p,
            publishedAt: new Date(p.publishedAt),
        }));
        let inserted = 0;
        for (let i = 0; i < rows.length; i += BATCH_SIZE) {
            const res = await this.prisma.publication.createMany({
                data: rows.slice(i, i + BATCH_SIZE),
                skipDuplicates: true,
            });
            inserted += res.count;
        }
        this.logger.log(`Base : ${inserted} nouvelles (${rows.length - inserted} déjà présentes)`);
    }
};
exports.DatagouvIngestService = DatagouvIngestService;
exports.DatagouvIngestService = DatagouvIngestService = DatagouvIngestService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pertinence_1.PertinenceService,
        briefAgent_1.BriefService,
        scriptCache_1.ScriptCache])
], DatagouvIngestService);
//# sourceMappingURL=Datagouv.service.js.map