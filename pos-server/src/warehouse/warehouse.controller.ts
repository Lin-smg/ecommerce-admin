import { Controller, UseGuards, UseInterceptors, HttpCode, HttpStatus, Get, Query, DefaultValuePipe, ParseIntPipe, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { OutWarehousePageDto } from './dto/out-warehouse-page.dto';
import { PermissionsType } from '../common/constants/permissions-type';
import { Permissions } from '../common/decorators/permissions.decorator';
import { plainToClass } from 'class-transformer';
import { WarehouseService } from './warehouse.service';
import { OutWarehouseDto } from './dto/out-warehouse.dto';
import { InWarehousesDto } from './dto/in-warehouse.dto';
import { Warehouse } from './warehouse.entity';

@Controller('warehouse')
@ApiTags('warehouse')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class WarehouseController {

    //Service Constructor
    constructor(
        private readonly warehouseService: WarehouseService,
    ) { }

    //Create Warehouse
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutWarehouseDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiBody({type:InWarehousesDto})
    // @Permissions(PermissionsType.USERS_CREATE)
    @Post()
    async create( @Body() dto: InWarehousesDto) {
    try {
            return plainToClass(
                OutWarehouseDto,
                await this.warehouseService.create({
                    item: plainToClass(Warehouse, dto)
                })
            );
        } catch (error) {
            throw error;
        }
    }

    //Delete Warehouse
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutWarehouseDto,
        description: 'The record has been successfully deleted.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiBody({type:InWarehousesDto})
    // @Permissions(PermissionsType.USERS_CREATE)
    @Post('delete')
    async delete( @Body() dto: InWarehousesDto) {
    try {
            return plainToClass(
                OutWarehouseDto,
                await this.warehouseService.delete({
                    item: plainToClass(Warehouse, dto)
                })
            );
        } catch (error) {
            throw error;
        }
    }

     //Update Warehouse
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
       status: HttpStatus.OK,
       type: OutWarehouseDto,
       description: 'The record has been successfully updated.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiParam({ name: 'id'})
     @Put(':id')
     async update(@Param('id') id, @Body() dto: InWarehousesDto) {
       
       try {
         return plainToClass(
           OutWarehouseDto,
           await this.warehouseService.update({
             id,
             item: await plainToClass(Warehouse, dto)
           })
         );
       } catch (error) {
         throw error;
       }
     }

      


    // Find WareHouse
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutWarehousePageDto,
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
                OutWarehousePageDto,
                await this.warehouseService.getWarehouse({
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
