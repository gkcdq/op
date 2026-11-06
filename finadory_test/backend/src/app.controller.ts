import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { PertinenceService } from './script/datagouv/pertinence';

function toInt(value: string | undefined, name: string): number | undefined
{
  if (value === undefined || value === '')
    return undefined;
  const n = Number(value);
  if (!Number.isInteger(n))
    throw new BadRequestException(`"${name}" doit être un entier`);
  return n;
}

@Controller()
export class AppController
{
  constructor(private readonly pertinence: PertinenceService,) {}

  @Get()
  health()
  {
    return { status: 'ok' };
  }

  // @Get('pertinence')
  // async classement()
  // {
  //   const liste = await this.pertinence.classement();
  //   return liste.slice(0, 20);
  // }

  @Get('top')
  top()
  {
    return this.pertinence.getTop();
  }
}