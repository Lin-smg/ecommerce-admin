import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { CategoryDto } from "src/category/dto/category.dto";

export class MainSubCategoryDto {
    @ApiProperty()
    categoryCode: string;

    @ApiProperty()
    categoryName: string;

    @Type(() => CategoryDto)
    @ApiProperty({type: CategoryDto, isArray: true})
    subCategoryList: CategoryDto[];
}