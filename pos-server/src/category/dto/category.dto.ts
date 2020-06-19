import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CategoryDto {

    @ApiProperty()
    categoryCode: string;

    @ApiProperty()
    categoryName: string;

    @ApiProperty()
    description: string;
    
}