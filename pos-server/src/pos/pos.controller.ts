import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { InProductsPurchaseDto } from './dto/in-products-purchase.dto';
import { OutProductsPurchaseDto } from './dto/out-products-purchase.dto';
import { plainToClass } from 'class-transformer';
import { PosService } from './pos.service';

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
 async create( @Body() dto: InProductsPurchaseDto) {
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
    
}
