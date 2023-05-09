import { RoleEntity } from 'src/roles/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ManyToMany(() => RoleEntity, (RoleEntity) => RoleEntity.users, {
    eager: true,
  })
  @JoinTable({ name: 'user_role_relations' })
  public roles: RoleEntity[];
}
