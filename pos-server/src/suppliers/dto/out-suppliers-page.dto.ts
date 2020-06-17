import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { SuppliersDto } from './suppliers.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutSuppliersPageDto {
    @Type(() => SuppliersDto)
    @ApiProperty({ type: SuppliersDto, isArray: true })
    data: SuppliersDto[];

    @Type(() => SuppliersDto)
    @ApiProperty({ type: SuppliersDto, isArray: true })
    all: SuppliersDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
