import { ApiProperty } from '@nestjs/swagger';
import { SuppliersDto } from './suppliers.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutSuppliersAllDto {
    @Type(() => SuppliersDto)
    @ApiProperty({ type: SuppliersDto, isArray: true})
    data: SuppliersDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
