import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class InCreateCategoryDto {

    @ApiProperty()
    readonly categoryCode: string;

    @ApiProperty()
    readonly categoryName: string;

    @ApiProperty()
    readonly description: string;

}