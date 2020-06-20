import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutCategoryPageDto {
    @Type(() => CategoryDto)
    @ApiProperty({ type: CategoryDto, isArray: true })
    data: CategoryDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
