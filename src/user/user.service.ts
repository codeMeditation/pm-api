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
import { CreateUpdateDto } from './dto/create-update.dto';

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

  public async create(user: CreateUpdateDto): Promise<UserEntity> {
    try {
      return await this.repository.save({
        name: user.name,
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(
          `User with name ${user.name} already exists`,
        );
      }
      throw error;
    }
  }

  public async update(
    idOrName: string,
    user: CreateUpdateDto,
  ): Promise<UserEntity> {
    const existingUser = await this.repository.findOne({
      where: [{ id: idOrName }, { name: idOrName }],
      select: ['id', 'name'],
    });
    if (existingUser === null) {
      throw new NotFoundException(
        `User with ID or name ${idOrName} cannot be found`,
      );
    }
    return await this.repository.save({
      id: existingUser.id,
      name: user.name,
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
