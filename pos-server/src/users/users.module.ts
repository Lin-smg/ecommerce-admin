import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CryptoModule } from './crypto/crypto.module';
import { PermissionModule } from '../permission/permission.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CryptoModule,
    PermissionModule
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule { }
