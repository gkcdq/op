import { OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PertinenceService, PublicationNotee } from './pertinence';
import { BriefService } from './brief.service';
export declare class DatagouvIngestService implements OnApplicationBootstrap, OnModuleDestroy {
    private readonly prisma;
    private readonly pertinence;
    private readonly briefService;
    private readonly logger;
    private timer?;
    private cycleEnCours;
    top5publicationsTab: PublicationNotee[];
    constructor(prisma: PrismaService, pertinence: PertinenceService, briefService: BriefService);
    onApplicationBootstrap(): void;
    onModuleDestroy(): void;
    private cycle;
    private executerIngestion;
    private executerClassement;
    ingest(): Promise<void>;
}
