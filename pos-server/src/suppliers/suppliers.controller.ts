import { Controller, UseGuards, UseInterceptors, HttpCode, HttpStatus, Get, Query, DefaultValuePipe, ParseIntPipe, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { OutSuppliersPageDto } from './dto/out-suppliers-page.dto';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsType } from '../common/constants/permissions-type';
import { plainToClass } from 'class-transformer';
import { SuppliersService } from './suppliers.service';
import { OutSuppliersDto } from './dto/out-suppliers.dto';
import { InCreateSuppliersDto } from './dto/in-create-suppliers.dto';
import { Suppliers } from './suppliers.entity';
import { OutSuppliersAllDto } from './dto/out-suppliers-all.dto';

@Controller('suppliers')
@ApiTags('suppliers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class SuppliersController {

    //Servie Constructor
    constructor(
        private readonly suppliersService: SuppliersService,
    ) { }

     //Create Supplier
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
         status: HttpStatus.OK,
         type: OutSuppliersDto,
         description: 'The record has been successfully created.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiBody({type:InCreateSuppliersDto})
     @Permissions(PermissionsType.USERS_CREATE)
     @Post()
     async create( @Body() dto: InCreateSuppliersDto) {
     try {
             return plainToClass(
                 OutSuppliersDto,
                 await this.suppliersService.create({
                     item: plainToClass(Suppliers, dto)
                 })
             );
         } catch (error) {
            
             throw error;
         }
     }
 
      //delete Supplier
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
          status: HttpStatus.OK,
          type: OutSuppliersDto,
          description: 'The record has been successfully deleted.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiBody({type:InCreateSuppliersDto})
      @Permissions(PermissionsType.USERS_CREATE)
      @Post("delete")
      async delete( @Body() dto: InCreateSuppliersDto) {
      try {
              return plainToClass(
                  OutSuppliersDto,
                  await this.suppliersService.delete({
                      item: plainToClass(Suppliers, dto)
                  })
              );
          } catch (error) {
             
              throw error;
          }
      }
  
      //Update Supplier
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
        status: HttpStatus.OK,
        type: OutSuppliersDto,
        description: 'The record has been successfully updated.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiParam({ name: 'id'})
      @Put(':id')
      async update(@Param('id') id, @Body() dto: InCreateSuppliersDto) {        
        try {
          return plainToClass(
            OutSuppliersDto,
            await this.suppliersService.update({
              id,
              item: await plainToClass(Suppliers, dto)
            })
          );
        } catch (error) {
          throw error;
        }
      }


    // Supplier Find
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutSuppliersPageDto,
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
    async getSuppliers(
        @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutSuppliersPageDto,
                await this.suppliersService.getSuppliers({
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
    
    // Supplier Find
    @HttpCode(HttpStatus.OK)
    @Get('All')
    @Permissions(PermissionsType.USERS)
    async getAllSuppliers() {
        try {
            return plainToClass(
                OutSuppliersAllDto,
                await this.suppliersService.getAllSuppliers()
            );
        } catch (error) {
            throw error;
        }
    }
}
