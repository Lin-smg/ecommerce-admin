import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { MainCategoryDto } from "./main-category.dto";

export class OutMainCategoryDto {
    @Type(() => MainCategoryDto)
    @ApiProperty({type: MainCategoryDto})
    data: MainCategoryDto;
    
    @ApiProperty({default: HttpStatus.OK })
    code: number = HttpStatus.OK;
}