import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionGroup } from './permission-group.entity';
import { PermissionGroupService } from './permission-group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission,PermissionGroup]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService,PermissionGroupService],
  exports: [PermissionService,PermissionGroupService]
})
export class PermissionModule {}
