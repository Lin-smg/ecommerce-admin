
import { Controller, Get, HttpCode, HttpStatus, Query, Body, Param, ParseIntPipe, DefaultValuePipe, Post, UseGuards, UseInterceptors, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiQuery, ApiBody, ApiBearerAuth, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { OutUsersPageDto } from './dto/out-users-page.dto';
import { plainToClass } from 'class-transformer';
import { InCreateUsersDto } from './dto/in-create-users.dto';
import { OutUsersDto } from './dto/out-users.dto';
import { User } from './users.entity';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { PermissionsType } from '../common/constants/permissions-type';
import { Permissions } from '../common/decorators/permissions.decorator';
import { LoginUserInfoDto } from './dto/login-userinfo.dto';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { UsersDto } from './dto/users.dto';
import { PermissionService } from '../permission/permission.service';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard,PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UsersController {
    //Servie Constructor
    constructor(private readonly userService: UsersService,
        private readonly permissionService: PermissionService,
) { }

    //Create User
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutUsersDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiBody({type:InCreateUsersDto})
    @Permissions(PermissionsType.USERS_CREATE)
    @Post()
    async create( @Body() dto: InCreateUsersDto) {
    try {
            return plainToClass(
                OutUsersDto,
                await this.userService.create({
                    item: plainToClass(User, dto)
                })
            );
        } catch (error) {
            throw error;
        }
    }

  //Delete User
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: HttpStatus.OK,
      type: OutUsersDto,
      description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBody({type:InCreateUsersDto})
  @Permissions(PermissionsType.USERS_CREATE)
  @Post('delete')
  async delete( @Body() dto: InCreateUsersDto) {
  try {
          return plainToClass(
              OutUsersDto,
              await this.userService.delete({
                  item: plainToClass(User, dto)
              })
          );
      } catch (error) {
          throw error;
      }
  }

      //Update User
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
        status: HttpStatus.OK,
        type: OutUsersDto,
        description: 'The record has been successfully updated.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiParam({ name: 'userid'})
      @Put(':userid')
      async update(@Param('userid') userid, @Body() dto: InCreateUsersDto) {
        
        try {
          return plainToClass(
            OutUsersDto,
            await this.userService.update({
              userid,
              item: await plainToClass(User, dto)
            })
          );
        } catch (error) {
          throw error;
        }
      }

    // User Find
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutUsersPageDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiQuery({
        name: 'q',
        required: false,
        type: String,
        description: 'Text for search (default: empty)'
    })
    @ApiQuery({
        name: 'sort',
        required: false,
        type: String,
        description: 'Column name for sort (default: -id)'
    })
    @ApiQuery({
        name: 'per_page',
        required: false,
        type: Number,
        description: 'Number of results to return per page. (default: 10)'
    })
    @ApiQuery({
        name: 'cur_page',
        required: false,
        type: Number,
        description: 'A page number within the paginated result set. (default: 1)'
    })
    @ApiQuery({
        name: 'group',
        required: false,
        type: Number,
        description: 'Group id for filter data by group. (default: empty)'
    })
    @Get()
    @Permissions(PermissionsType.USERS)
    async getUsers(
        @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutUsersPageDto,
                await this.userService.getUsers({
                    curPage,
                    perPage,
                    q,
                    sort,
                    group
                })
            );
        } catch (error) {
            throw error;
        }
    }

    @Get('info')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: LoginUserInfoDto,
        description: 'User info with access token',
    })
    async getUserInfo(
        @AuthUser()user:User
    ): Promise<LoginUserInfoDto> {
        try {
            const userInfo = await this.userService.findByUserId({userid: user.userid})
            const permissions = await this.permissionService.getAllPermission();  
            return new LoginUserInfoDto(plainToClass(UsersDto,userInfo), permissions);     
        } catch (error) {
         throw error;   
        }
               
    }
}
