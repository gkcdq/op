import { Controller, Get, Query } from '@nestjs/common';
import { DatagouvIngestService } from './script/datagouv/Datagouv.service';
import { ScriptCache } from './script/scriptCache';

@Controller()
export class AppController
{
  constructor(private readonly datagouv: DatagouvIngestService, private readonly scriptCache: ScriptCache) {}

  @Get('top')
  top()
  {
    return this.datagouv.top5publicationsTab;
  }

  @Get('brief')
  brief(@Query('search') search?: string)
  {
    return this.scriptCache.getFilteredBriefs(search);
  }
}