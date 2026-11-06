import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PertinenceService } from './script/datagouv/pertinence';
import { DatagouvIngestService } from './script/datagouv/Datagouv.service.ts';
import { BriefService } from './api/ia/briefAgent';
import { ScriptCache } from './script/scriptCache';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [
    PertinenceService, 
    DatagouvIngestService, 
    BriefService,
    ScriptCache,
  ],
})
export class AppModule {}