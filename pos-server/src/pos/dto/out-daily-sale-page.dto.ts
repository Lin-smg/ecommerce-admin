import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { ProductsSaleDto } from './products-sale.dto';


export class OutDailySalePageDto {
    @Type(() => ProductsSaleDto)
    @ApiProperty({ type: ProductsSaleDto, isArray: true })
    data: ProductsSaleDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
