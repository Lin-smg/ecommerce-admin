import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { PermissionDto } from './dto/permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        public readonly permissionRepository: Repository<Permission>,
    ){}
    async getAllPermission() {
       try { 
           let permission = await this.permissionRepository.find();          
           return plainToClass(PermissionDto,permission);

       } catch (error) {
           throw(error)
       }
    }
}
