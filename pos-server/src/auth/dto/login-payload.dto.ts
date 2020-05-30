'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './token-payload.dto';
import { UsersDto } from '../../users/dto/users.dto';
import { PermissionDto } from '../../permission/dto/permission.dto';
import { PermissionGroupDto } from '../../permission/dto/permission-group.dto';

export class LoginPayloadDto {
    @ApiProperty({ type: UsersDto })
    user: UsersDto;
    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;
    @ApiProperty({ type: PermissionDto })
    permission: PermissionDto[];
    @ApiProperty({ type: PermissionGroupDto })
    permissionGroup: PermissionGroupDto[];

    constructor(user: UsersDto, token: TokenPayloadDto, permission: PermissionDto[], permissionGroup: PermissionGroupDto[]) {
        this.user = user;
        this.token = token;
        this.permission = permission;
        this.permissionGroup = permissionGroup;
    }
}
