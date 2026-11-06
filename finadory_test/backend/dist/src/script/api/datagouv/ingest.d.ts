import { OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { PertinenceService } from './pertinence';
export declare class DatagouvIngestService implements OnApplicationBootstrap, OnModuleDestroy {
    private readonly prisma;
    private readonly pertinence;
    private readonly logger;
    private timer?;
    private cycleEnCours;
    constructor(prisma: PrismaService, pertinence: PertinenceService);
    onApplicationBootstrap(): void;
    onModuleDestroy(): void;
    private cycle;
    private executerIngestion;
    private executerClassement;
    ingest(): Promise<void>;
}
