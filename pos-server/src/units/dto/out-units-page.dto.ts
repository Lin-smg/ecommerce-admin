import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { UnitsDto } from './units.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutUnitsPageDto {
    @Type(() => UnitsDto)
    @ApiProperty({ type: UnitsDto, isArray: true })
    data: UnitsDto[];

    @Type(() => UnitsDto)
    @ApiProperty({ type: UnitsDto, isArray: true })
    all: UnitsDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
