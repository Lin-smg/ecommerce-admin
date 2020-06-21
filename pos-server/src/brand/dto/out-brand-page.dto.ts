import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { BrandDto } from './brand.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutBrandPageDto {
    @Type(() => BrandDto)
    @ApiProperty({ type: BrandDto, isArray: true })
    data: BrandDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
