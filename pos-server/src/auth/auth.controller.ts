import { Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { plainToClass } from 'class-transformer';
import { UsersDto } from '../users/dto/users.dto';
import { PermissionService } from '../permission/permission.service';
import { PermissionGroupService } from '../permission/permission-group.service';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { CustomersDto } from 'src/customers/dto/customers.dto';
import { CustomerLoginRelyDto } from './dto/customer-login-reply.dto';


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
        try {
            const userEntity = await this.authService.validateUser(userLoginDto);
            const token = await this.authService.createToken(userEntity);
            const permissions = await this.permissionService.getAllPermission();  
            const permissionsGroup = await this.permissionGroupService.getAllPermissionGroup();
            return new LoginPayloadDto(plainToClass(UsersDto,userEntity), token, permissions, permissionsGroup );     
        } catch (error) {
         throw error;   
        }
               
    }

    @Post('customer/login')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginPayloadDto,
        description: 'User info with access token',
    })
    async customerLogin(
        @Body() customerLoginDto: CustomerLoginDto,
    ): Promise<CustomerLoginRelyDto> {
        try {
            const customerEntity = await this.authService.validateCustomer(customerLoginDto);
            const token = await this.authService.createCustomerToken(customerEntity);
            // const permissions = await this.permissionService.getAllPermission();  
            // const permissionsGroup = await this.permissionGroupService.getAllPermissionGroup();
            return new CustomerLoginRelyDto(plainToClass(CustomersDto,customerEntity), token);     
        } catch (error) {
         throw error;   
        }
               
    }

    @Get('create')
    async createDefaultUser() {
        try {
            return await this.authService.createDefaultUser();
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}
