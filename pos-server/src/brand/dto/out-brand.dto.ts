import { ApiProperty } from '@nestjs/swagger';
import { BrandDto } from './brand.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutBrandDto {
    @Type(() => BrandDto)
    @ApiProperty({ type: BrandDto})
    data: BrandDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
