import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutCategoryDto {
    @Type(() => CategoryDto)
    @ApiProperty({ type: CategoryDto})
    data: CategoryDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
