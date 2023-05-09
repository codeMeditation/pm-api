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
import { UserService } from './user.service';
import { BaseQueryDto } from '../common/base-query.dto';
import { UserEntity } from './user.entity';
import { CreateDto } from './dto/create.dto';
import { buildSearchParams } from '@codemeditation/queryhelper';
import { UpdateDto } from './dto/update.dto';

@Controller('api/users')
export class UserController {
  public constructor(private readonly service: UserService) {}

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
  public create(@Body() user: CreateDto): Promise<UserEntity> {
    return this.service.create(user);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  public update(@Body() params: UpdateDto): Promise<UserEntity> {
    return this.service.update(params);
  }

  @Delete(':idOrName')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('idOrName') idOrName: string): Promise<void> {
    return this.service.delete(idOrName);
  }
}
