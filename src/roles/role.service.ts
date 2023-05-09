import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbQuery } from '../common/DbQuery';
import { RoleEntity } from './role.entity';
import { FindAndCountResult } from 'src/common/find-and-count-result';
import { CreateUpdateDto } from './dto/create-update.dto';

@Injectable()
export class RoleService {
  public constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  public async search(query: DbQuery): Promise<FindAndCountResult<RoleEntity>> {
    return FindAndCountResult.fromQuery(
      await this.repository.findAndCount(query),
    );
  }

  public async create(params: CreateUpdateDto): Promise<RoleEntity> {
    try {
      return await this.repository.save({
        name: params.name,
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(
          `Role with name ${params.name} already exists`,
        );
      }
      throw error;
    }
  }

  public async update(
    idOrName: string,
    params: CreateUpdateDto,
  ): Promise<RoleEntity> {
    const existingRole = await this.repository.findOne({
      where: [{ id: idOrName }, { name: idOrName }],
      select: ['id', 'name'],
    });
    if (existingRole === null) {
      throw new NotFoundException(
        `Role with ID or name ${idOrName} cannot be found`,
      );
    }
    return await this.repository.save({
      id: existingRole.id,
      name: params.name,
    });
  }

  public async delete(idOrName: string): Promise<void> {
    const existingRole = await this.repository.findOne({
      where: [{ id: idOrName }, { name: idOrName }],
      select: ['id', 'name'],
    });
    if (existingRole === null) {
      throw new NotFoundException(
        `Role with ID or name ${idOrName} cannot be found`,
      );
    }
    await this.repository.delete(existingRole.id);
  }
}
