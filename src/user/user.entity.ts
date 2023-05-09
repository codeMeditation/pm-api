import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  public name: string;
}
