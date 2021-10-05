import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../../common/dto/page_meta.dto';
import { ProductsDto } from '../../../products/dto/products.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { BrandDto } from '../../../brand/dto/brand.dto';
import { CategoryDto } from '../../../category/dto/category.dto';
import { UnitsDto } from '../../../units/dto/units.dto';

export class OutProductDto {
    @Type(() => ProductsDto)
    @ApiProperty({ type: ProductsDto, isArray: true })
    data: ProductsDto[];

    @Type(() => BrandDto)
    @ApiProperty({ type: BrandDto, isArray: true })
    brands: BrandDto[];
    
    @Type(() => CategoryDto)
    @ApiProperty({ type: CategoryDto, isArray: true })
    categorys: CategoryDto[];

    @Type(() => UnitsDto)
    @ApiProperty({ type: UnitsDto, isArray: true })
    units: UnitsDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
