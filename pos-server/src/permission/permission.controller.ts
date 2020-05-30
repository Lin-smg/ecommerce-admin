import { Controller, HttpCode, HttpStatus, Body, Post, Param, Put, Get, Query, DefaultValuePipe, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { PermissionGroupService } from './permission-group.service';
import { ApiResponse, ApiBody, ApiParam, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OutPermissionGroupDto } from './dto/out-permission-group.dto';
import { InCreatePermissionGroupDto } from './dto/in-create-permission-group.dto';
import { plainToClass } from 'class-transformer';
import { PermissionGroup } from './permission-group.entity';
import { OutPermissionGroupPageDto } from './dto/out-permission-group-page.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';

@Controller('permission')
@ApiTags('permission')
@UseGuards(JwtAuthGuard,PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class PermissionController {

    constructor(private readonly permissionGroupService:PermissionGroupService){}

    //Create Permission Group
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutPermissionGroupDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiBody({type:InCreatePermissionGroupDto})
    //@Permissions(PermissionsType.USERS_CREATE)
    @Post()
    async create( @Body() dto: InCreatePermissionGroupDto) {
    try {
            return plainToClass(
                OutPermissionGroupDto,
                await this.permissionGroupService.create({
                    item: plainToClass(PermissionGroup, dto)
                })
            );
        } catch (error) {
            throw error;
        }
    }

    //Update Permission Group
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
      status: HttpStatus.OK,
      type: OutPermissionGroupDto,
      description: 'The record has been successfully updated.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiParam({ name: 'groupcode'})
    @Get(':groupcode')
    async findOne(@Param('groupcode') groupcode) {
      
      try {
        return plainToClass(
           OutPermissionGroupDto,
          await this.permissionGroupService.findWithGroupCode({groupcode})
        );
      } catch (error) {
        throw error;
      }
    }


    //Update Permission Group
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
       status: HttpStatus.OK,
       type: OutPermissionGroupDto,
       description: 'The record has been successfully updated.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiParam({ name: 'groupcode'})
     @Put(':groupcode')
     async update(@Param('groupcode') groupcode, @Body() dto: InCreatePermissionGroupDto) {
       
       try {
         return plainToClass(
            OutPermissionGroupDto,
           await this.permissionGroupService.update({
            groupcode,
             item: await plainToClass(PermissionGroup, dto)
           })
         );
       } catch (error) {
         throw error;
       }
     }

    // Find Group Permission
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutPermissionGroupPageDto,
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
   // @Permissions(PermissionsType.USERS)
    async getUsers(
        @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutPermissionGroupPageDto,
                await this.permissionGroupService.getPermissionGroup({
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

}
