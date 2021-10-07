import { ApiProperty } from "@nestjs/swagger";

export class CreateMainCategoryDto {
    @ApiProperty()
    readonly categoryCode: string;

    @ApiProperty()
    readonly categoryName: string;

    @ApiProperty()
    readonly description: string;
}
