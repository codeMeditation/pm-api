import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { RoleService } from './role.service';
import { BaseQueryDto } from '../common/base-query.dto';
import { RoleEntity } from './role.entity';
import { CreateUpdateDto } from './dto/create-update.dto';
import { buildSearchParams } from '@codemeditation/queryhelper';

@Controller('api/roles')
export class RoleController {
  public constructor(private readonly service: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async search(
    @Query() query: BaseQueryDto,
    @Res() res: Response,
  ): Promise<Response> {
    const result = await this.service.search(buildSearchParams(query));
    res.setHeader('x-item-count', result.count);
    res.json(result.entities);
    return res;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() params: CreateUpdateDto): Promise<RoleEntity> {
    return this.service.create(params);
  }

  @Put(':idOrName')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(
    @Param('idOrName') idOrName: string,
    @Body() params: CreateUpdateDto,
  ): Promise<RoleEntity> {
    return this.service.update(idOrName, params);
  }

  @Delete(':idOrName')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('idOrName') idOrName: string): Promise<void> {
    return this.service.delete(idOrName);
  }
}
