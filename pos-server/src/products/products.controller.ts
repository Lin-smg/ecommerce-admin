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
// import { ProductsUnitsDto } from './dto/products-units.dto';
import { ProductsUnitsService } from './products-units.service';
import { OutProductsPosDto } from './dto/out-products-pos.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
@Controller('products')
@ApiTags('products')
@UseGuards(JwtAuthGuard, RolesGuard)
// @UseInterceptors(AuthCustomerInterceptor)
@ApiBearerAuth()
export class ProductsController {
 //Servie Constructor
 constructor(
    private readonly productsService: ProductsService,
    private readonly productsUnitsService: ProductsUnitsService,
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
        console.log('delete')
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
          item: dto
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
@Roles('admin')
//@Permissions(PermissionsType.USERS)
async getProduct(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort
) {
    try {
        console.log('getProduct')
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
        console.log(error)
        throw error;
    }
}

//Find POS Product
@HttpCode(HttpStatus.OK)
@Get('pos')
//@Permissions(PermissionsType.USERS)
async getPOSProduct(
    @Query('product') product,
    @Query('supplier') supplier,
    @Query('category') category
) {
    try {
        return plainToClass(
            OutProductsPosDto,
            await this.productsService.getPOSProducts({
                product,
                supplier,
                category
            })
        );
    } catch (error) {
        throw error;
    }
}


//Find POS Product
@HttpCode(HttpStatus.OK)
@Get('All')
//@Permissions(PermissionsType.USERS)
async getAllProduct() {
    try {
        return plainToClass(
            OutProductsPosDto,
            await this.productsService.getAllProducts());
    } catch (error) {
        throw error;
    }
}

//Find POS Product
@HttpCode(HttpStatus.OK)
@Get(':supplierId')
//@Permissions(PermissionsType.USERS)
async getProductWithSupplier(@Param('supplierId') supplierId) {
    try {
        return plainToClass(
            OutProductsPosDto,
            await this.productsService.getProductsWithSupplier(supplierId));
    } catch (error) {
        throw error;
    }
}

 //get Parent Units
//  @HttpCode(HttpStatus.OK)
//  @ApiResponse({
//    status: HttpStatus.OK,
//    type: ProductsUnitsDto,
//    description: ''
//  })
//  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
//  @Get('productUnit')
//  async getParentUnitWithId(@Query('id',ParseIntPipe) id, @Query('productCode') productCode){        
//    try {
//      return plainToClass(
//         ProductsUnitsDto,
//        await this.productsUnitsService.getProductUnitWithId({id,productCode})
//      );
//    } catch (error) {
//        console.log(error)
//      throw error;
//    }
//  }



}
