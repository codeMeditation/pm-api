import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ManyToMany(() => UserEntity, (UserEntity) => UserEntity.roles, {
    onDelete: 'CASCADE',
  })
  public users?: UserEntity[];
}
