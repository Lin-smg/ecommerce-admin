import { HttpStatus } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { PageMetaDto } from "src/common/dto/page_meta.dto";
import { MainCategoryDto } from "./main-category.dto";

export class OutMainCategoryAllDto {
    @Type(() => MainCategoryDto)
    @ApiProperty({type: MainCategoryDto, isArray: true})
    data: MainCategoryDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({default: HttpStatus.OK })
    code: number = HttpStatus.OK;
}