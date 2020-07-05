import { Controller, HttpCode, HttpStatus, Post, Body, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { InProductsPurchaseDto } from './dto/in-products-purchase.dto';
import { OutProductsPurchaseDto } from './dto/out-products-purchase.dto';
import { plainToClass } from 'class-transformer';
import { PosService } from './pos.service';
import { InProductsOrderDto } from './dto/in-products-order.dto';
import { OutProductsSaleDto } from './dto/out-products-sale.dto';
import { InProductsSaleDto } from './dto/in-products-sale.dto';

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
 @ApiResponse({
     status: HttpStatus.OK,
     type: InProductsOrderDto,
     description: 'The record has been successfully created.'
 })
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


}
