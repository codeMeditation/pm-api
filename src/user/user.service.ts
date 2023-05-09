import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbQuery } from '../common/DbQuery';
import { UserEntity } from './user.entity';
import { FindAndCountResult } from 'src/common/find-and-count-result';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public async search(query: DbQuery): Promise<FindAndCountResult<UserEntity>> {
    return FindAndCountResult.fromQuery(
      await this.repository.findAndCount(query),
    );
  }

  public async create(params: CreateDto): Promise<UserEntity> {
    try {
      return await this.repository.save({
        name: params.name,
        roles: params.roleIds?.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(
          `User with name ${params.name} already exists`,
        );
      }
      throw error;
    }
  }

  public async update(params: UpdateDto): Promise<UserEntity> {
    const existingUser = await this.repository.findOne({
      where: [{ id: params.id }],
    });
    if (existingUser === null) {
      throw new NotFoundException(`User with ID ${params.id} cannot be found`);
    }
    return await this.repository.save({
      id: existingUser.id,
      name: params.name,
      roles: params.roleIds?.map((id) => ({ id })),
    });
  }

  public async delete(idOrName: string): Promise<void> {
    const existingUser = await this.repository.findOne({
      where: [{ id: idOrName }, { name: idOrName }],
      select: ['id', 'name'],
    });
    if (existingUser === null) {
      throw new NotFoundException(
        `User with ID or name ${idOrName} cannot be found`,
      );
    }
    await this.repository.delete(existingUser.id);
  }
}
