import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { PublicationsService } from './publications/publications.service';
import { PertinenceService } from './script/api/datagouv/pertinence';

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
  constructor(private readonly publications: PublicationsService,private readonly pertinence: PertinenceService,) {}

  @Get()
  health()
  {
    return { status: 'ok' };
  }

  @Get('publications')
  list(@Query('issuer') issuer?: string,@Query('subtype') subtype?: string,@Query('from') from?: string,@Query('to') to?: string,@Query('limit') limit?: string,@Query('offset') offset?: string,)
  {
    return this.publications.list({
      issuer,
      subtype,
      from,
      to,
      limit: toInt(limit, 'limit'),
      offset: toInt(offset, 'offset'),
    });
  }

  @Get('publications/subtypes')
  subtypes()
  {
    return this.publications.subtypes();
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