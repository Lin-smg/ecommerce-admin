import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { ProductsDto } from './products.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { BrandDto } from '../../brand/dto/brand.dto';
import { CategoryDto } from '../../category/dto/category.dto';
import { UnitsDto } from '../../units/dto/units.dto';

export class OutProductsPosDto {
    @Type(() => ProductsDto)
    @ApiProperty({ type: ProductsDto, isArray: true })
    data: ProductsDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
