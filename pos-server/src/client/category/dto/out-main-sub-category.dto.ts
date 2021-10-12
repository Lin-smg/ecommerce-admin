import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { MainSubCategoryDto } from "./main-sub-category.dto";

export class OutMainSubCategoryDto {
    @Type(() => MainSubCategoryDto)
    @ApiProperty({type: MainSubCategoryDto, isArray: true})
    data: MainSubCategoryDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}