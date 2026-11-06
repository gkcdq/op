import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { DatagouvIngestService } from './script/datagouv/Datagouv.service.ts.js';
import { ScriptCache } from './script/scriptCache.js';

// function toInt(value: string | undefined, name: string): number | undefined
// {
//   if (value === undefined || value === '')
//     return undefined;
//   const n = Number(value);
//   if (!Number.isInteger(n))
//     throw new BadRequestException(`"${name}" doit être un entier`);
//   return n;
// }

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
  brief()
  {
    return this.scriptCache.getBriefs();
  }
}