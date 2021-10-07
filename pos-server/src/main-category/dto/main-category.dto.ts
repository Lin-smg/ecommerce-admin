import { ApiProperty } from "@nestjs/swagger";

export class MainCategoryDto {
    @ApiProperty()
    categoryCode: string;

    @ApiProperty()
    categoryName: string;

    @ApiProperty()
    description: string;
}