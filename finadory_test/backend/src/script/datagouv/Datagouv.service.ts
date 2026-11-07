import { Injectable, Logger, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { fetchPeriod } from '../../api/datagouv/infoFinanciere'; 
import { PertinenceService, PublicationNotee } from './pertinence'; 
import { BriefService } from '../../api/ia/briefAgent';
import { ScriptCache } from '../scriptCache';

const DAYS = 3;                
const BATCH_SIZE = 500;          
const INTERVAL_MS = 30 * 60_000; 
const TOP_SIZE = 9;            

@Injectable()
export class DatagouvIngestService implements OnApplicationBootstrap, OnModuleDestroy
{
    private readonly logger = new Logger(DatagouvIngestService.name);
    private timer?: NodeJS.Timeout;
    private cycleEnCours = false;

    public top5publicationsTab: PublicationNotee[] = [];

    constructor(private readonly prisma: PrismaService,
        private readonly pertinence: PertinenceService, 
        private readonly briefService: BriefService,
        private readonly scriptCache: ScriptCache,) {}

    onApplicationBootstrap()
    {
        if (process.env.SCRIPT_DATAGOUVE_INFOFINANCIERE != "true")
            return;
        this.cycle();         
        this.timer = setInterval(() => this.cycle(), INTERVAL_MS);
    }

    onModuleDestroy()
    {
        if (this.timer)
            clearInterval(this.timer);
    }

    private async cycle()
    {
        if (this.cycleEnCours)
        {
            this.logger.warn('Cycle précédent encore en cours : celui-ci est ignoré');
            return;
        }
        this.cycleEnCours = true;

        try
        {
            await this.executerIngestion();
            await this.executerClassement(); 
        }
        finally
        {
            this.cycleEnCours = false;
        }
    }

    private async executerIngestion()
    {
        try
        {
            await this.ingest();
        }
        catch (error)
        {
            this.logger.error(`Ingestion échouée : ${error}`);
        }
    }

    private async executerClassement()
    {
        try
        {
            const top = await this.pertinence.actualiser(TOP_SIZE);
            this.top5publicationsTab = top; 

            this.logger.log(`Top ${top.length} :`);
            
            for (const p of top) {
                this.logger.log(`  ${p.points} pts | ${p.societe} | ${p.titre}`);

                await this.briefService.genererBrief(p); 
            }
            await this.scriptCache.refreshCache();
        }
        catch (error)
        {
            this.logger.error(`Classement échoué : ${error}`);
        }
    }

    async ingest()
    {
        this.logger.log(`Ingestion des ${DAYS} derniers jours...`);

        const result = await fetchPeriod(DAYS);
        // this.logger.log(`API : ${result.fetched} reçues, ${result.rejected} rejetées`);

        const rows = result.publications.map((p) => ({
            ...p,
            publishedAt: new Date(p.publishedAt),
        }));

        let inserted = 0;
        for (let i = 0; i < rows.length; i += BATCH_SIZE)
        {
            const res = await this.prisma.publication.createMany({
                data: rows.slice(i, i + BATCH_SIZE),
                skipDuplicates: true,
            });
            inserted += res.count;
        }
        this.logger.log(`Base : ${inserted} nouvelles (${rows.length - inserted} déjà présentes)`);
    }
}