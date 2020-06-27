import { Controller, UseGuards, UseInterceptors, HttpCode, HttpStatus, Body, Post, Param, Put, Get, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { ProductsService } from './products.service';
import { OutProductsDto } from './dto/out-products.dto';
import { InCreateProductsDto } from './dto/in-create-products.dto';
import { plainToClass } from 'class-transformer';
import { Products } from './products.entity';
import { OutProductsPageDto } from './dto/out-products-page.dto';

@Controller('products')
@ApiTags('products')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class ProductsController {
 //Servie Constructor
 constructor(
    private readonly productsService: ProductsService,
) {}

 //Create
 @HttpCode(HttpStatus.OK)
 @ApiResponse({
     status: HttpStatus.OK,
     type: OutProductsDto,
     description: 'The record has been successfully created.'
 })
 @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
 @ApiBody({type:InCreateProductsDto})
// @Permissions(PermissionsType.USERS_CREATE)
 @Post()
 async create( @Body() dto: InCreateProductsDto) {
 try {
         return plainToClass(
            OutProductsDto,
             await this.productsService.create({
                 item: dto
             })
         );
     } catch (error) {
        
         throw error;
     }
 } 
  //delete
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: HttpStatus.OK,
      type: OutProductsDto,
      description: 'The record has been successfully deleted.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })      
 //@Permissions(PermissionsType.USERS_CREATE)
  @Post("delete")
  async delete( @Body() dto: InCreateProductsDto) {
    try {
        return plainToClass(
          OutProductsDto,
          await this.productsService.delete({
            item: await plainToClass(Products, dto)
          })
        );
            
        } catch (error) {
           
            throw error;
        }
    }
  //Update Category
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutProductsDto,
    description: 'The record has been successfully updated.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'productCode'})
  @Put(':productCode')
  async update(@Param('productCode') productCode, @Body() dto: InCreateProductsDto) {        
    try {
      return plainToClass(
        OutProductsDto,
        await this.productsService.update({
            productCode,
          item: await plainToClass(Products, dto)
        })
      );
    } catch (error) {
      throw error;
    }
  }
//Find Product
@HttpCode(HttpStatus.OK)
@ApiResponse({
    status: HttpStatus.OK,
    type: OutProductsPageDto,
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
//@Permissions(PermissionsType.USERS)
async getCategory(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort
) {
    try {
        return plainToClass(
            OutProductsPageDto,
            await this.productsService.getProducts({
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
