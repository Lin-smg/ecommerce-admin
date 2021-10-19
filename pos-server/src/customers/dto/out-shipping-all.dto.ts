import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { ShippingDto } from './shipping.dto';
import { PageMetaDto } from 'src/common/dto/page_meta.dto';

export class OutShippingAllDto {
    @Type(() => ShippingDto)
    @ApiProperty({ type: ShippingDto, isArray: true})
    data: ShippingDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
