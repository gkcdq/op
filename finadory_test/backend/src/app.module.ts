import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicationsService } from './publications/publications.service';
import { PertinenceService } from './script/api/datagouv/pertinence';
import { DatagouvIngestService } from './script/api/datagouv/ingestClassementLLM';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [PublicationsService, PertinenceService, DatagouvIngestService],
})
export class AppModule {}