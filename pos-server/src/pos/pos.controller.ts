import { Controller, HttpCode, HttpStatus, Post, Body, Get, Param, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { InProductsPurchaseDto } from './dto/in-products-purchase.dto';
import { OutProductsPurchaseDto } from './dto/out-products-purchase.dto';
import { plainToClass } from 'class-transformer';
import { PosService } from './pos.service';
import { InProductsOrderDto } from './dto/in-products-order.dto';
import { OutProductsSaleDto } from './dto/out-products-sale.dto';
import { InProductsSaleDto } from './dto/in-products-sale.dto';
import { OutDailySalePageDto } from './dto/out-daily-sale-page.dto';

@Controller('pos')
export class PosController {
  //Servie Constructor
 constructor(
    private readonly posService: PosService,
) {}

 //Create
 @HttpCode(HttpStatus.OK)
 @ApiResponse({
     status: HttpStatus.OK,
     type: OutProductsPurchaseDto,
     description: 'The record has been successfully created.'
 })
 @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
 @ApiBody({type:InProductsPurchaseDto})
// @Permissions(PermissionsType.USERS_CREATE)
 @Post('purchase')
 async createPurchase( @Body() dto: InProductsPurchaseDto) {
 try {
         return plainToClass(
            OutProductsPurchaseDto,
             await this.posService.savePurchaseData({
                 item: dto
             })
         );
     } catch (error) {
        
         throw error;
     }
 } 
 
 //Create Order
 @HttpCode(HttpStatus.OK)
 @ApiResponse({
     status: HttpStatus.OK,
     type: InProductsOrderDto,
     description: 'The record has been successfully created.'
 })
 @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
 @ApiBody({type:InProductsOrderDto})
// @Permissions(PermissionsType.USERS_CREATE)
 @Post('posOrder')
 async createOrder( @Body() dto: InProductsOrderDto) {
 try {
         return plainToClass(
            OutProductsPurchaseDto,
             await this.posService.saveOrderData({
                 item: dto
             })
         );
     } catch (error) {
        
         throw error;
     }
 } 

  //Create Order
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
      status: HttpStatus.OK,
      type: InProductsOrderDto,
      description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBody({type:InProductsSaleDto})
 // @Permissions(PermissionsType.USERS_CREATE)
  @Post('posPay')
  async createPayNow( @Body() dto: InProductsSaleDto) {
  try {
          return plainToClass(
             OutProductsSaleDto,
              await this.posService.savePayNowData({
                  item: dto
              })
          );
      } catch (error) {
         
          throw error;
      }
  } 
 
 //Create Order
 @HttpCode(HttpStatus.OK)
// @Permissions(PermissionsType.USERS_CREATE)
 @Get(':customerId')
 async getCreditWithCustomer(@Param('customerId') customerId) {
 try {
         return await this.posService.findByCustomerId({
                 item: customerId
             })
     } catch (error) {
        
         throw error;
     }
 } 
// Find
@HttpCode(HttpStatus.OK)
@ApiResponse({
    status: HttpStatus.OK,
    type: OutDailySalePageDto,
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
})@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
@Get('dailySaleReport')
// @Permissions(PermissionsType.USERS)
async getDailySaleReport(
 @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
 @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
 @Query('q') q,
 @Query('group') group,
 @Query('sort') sort
) {
 try {
     return plainToClass(
        OutDailySalePageDto,
         await this.posService.findDailySaleReport({
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
