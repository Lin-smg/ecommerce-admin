'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { UsersDto } from './users.dto';
import { PermissionDto } from '../../permission/dto/permission.dto';
import { HttpStatus } from '@nestjs/common';

export class LoginUserInfoDto {
    @ApiProperty({ type: UsersDto })
    user: UsersDto;
    @ApiProperty({ type: PermissionDto })
    permission: PermissionDto[];
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

    constructor(user: UsersDto, permission: PermissionDto[]) {
        this.user = user;
        this.permission = permission;
    }
}
