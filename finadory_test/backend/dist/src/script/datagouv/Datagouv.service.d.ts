import { OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PertinenceService, PublicationNotee } from './pertinence';
import { BriefService } from '../../api/ia/briefAgent';
import { ScriptCache } from '../scriptCache';
export declare class DatagouvIngestService implements OnApplicationBootstrap, OnModuleDestroy {
    private readonly prisma;
    private readonly pertinence;
    private readonly briefService;
    private readonly scriptCache;
    private readonly logger;
    private timer?;
    private cycleEnCours;
    top5publicationsTab: PublicationNotee[];
    constructor(prisma: PrismaService, pertinence: PertinenceService, briefService: BriefService, scriptCache: ScriptCache);
    onApplicationBootstrap(): void;
    onModuleDestroy(): void;
    private cycle;
    private executerIngestion;
    private executerClassement;
    ingest(): Promise<void>;
}
