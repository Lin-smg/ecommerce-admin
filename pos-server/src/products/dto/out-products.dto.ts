import { ApiProperty } from '@nestjs/swagger';
import { ProductsDto } from './products.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutProductsDto {
    @Type(() => ProductsDto)
    @ApiProperty({ type: ProductsDto})
    data: ProductsDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
