import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { CategoryDto } from './category.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutCategoryPageDto {
    @Type(() => CategoryDto)
    @ApiProperty({ type: CategoryDto, isArray: true })
    data: CategoryDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
