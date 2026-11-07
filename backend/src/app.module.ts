import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PertinenceService } from './script/datagouv/pertinence';
import { DatagouvIngestService } from './script/datagouv/Datagouv.service';
import { BriefService } from './api/ia/briefAgent';
import { ScriptCache } from './script/scriptCache';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    PertinenceService,
    DatagouvIngestService,
    BriefService,
    ScriptCache,
  ],
})
export class AppModule {}