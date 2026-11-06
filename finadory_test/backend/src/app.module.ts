import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PertinenceService } from './script/datagouv/pertinence';
import { DatagouvIngestService } from './script/articulateStart';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [PertinenceService, DatagouvIngestService],
})
export class AppModule {}