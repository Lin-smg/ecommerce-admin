import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from '../users/users.service';
import { plainToClass } from 'class-transformer';
import { UsersDto } from '../users/dto/users.dto';
import { PermissionService } from '../permission/permission.service';
import { PermissionGroupService } from '../permission/permission-group.service';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly permissionService: PermissionService,
        private readonly permissionGroupService: PermissionGroupService,
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async userLogin(
        @Body() userLoginDto: UserLoginDto,
    ): Promise<LoginPayloadDto> {
        const userEntity = await this.authService.validateUser(userLoginDto);
        const token = await this.authService.createToken(userEntity);
        const permissions = await this.permissionService.getAllPermission();  
        const permissionsGroup = await this.permissionGroupService.getAllPermissionGroup();
        return new LoginPayloadDto(plainToClass(UsersDto,userEntity), token, permissions, permissionsGroup );        
    }
}
