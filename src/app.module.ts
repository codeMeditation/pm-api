import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { RoleEntity } from './roles/role.entity';
import { RoleModule } from './roles/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'test-password',
        database: 'pm_api_database',
        entities: [UserEntity, RoleEntity],
        synchronize: true,
      }),
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
