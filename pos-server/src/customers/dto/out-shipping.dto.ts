import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { ShippingDto } from './shipping.dto';


export class OutShippingDto {
    @Type(() => ShippingDto)
    @ApiProperty({ type: ShippingDto})
    data: ShippingDto;

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
