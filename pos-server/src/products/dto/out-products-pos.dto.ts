import { ApiProperty } from '@nestjs/swagger';

import { ProductsDto } from './products.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';

export class OutProductsPosDto {
    @Type(() => ProductsDto)
    @ApiProperty({ type: ProductsDto, isArray: true })
    data: ProductsDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
