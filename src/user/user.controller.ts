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
import { CreateUpdateDto } from './dto/create-update.dto';
import { buildSearchParams } from '@codemeditation/queryhelper';

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
  public create(@Body() user: CreateUpdateDto): Promise<UserEntity> {
    return this.service.create(user);
  }

  @Put(':idOrName')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(
    @Param('idOrName') idOrName: string,
    @Body() user: CreateUpdateDto,
  ): Promise<UserEntity> {
    return this.service.update(idOrName, user);
  }

  @Delete(':idOrName')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('idOrName') idOrName: string): Promise<void> {
    return this.service.delete(idOrName);
  }
}
