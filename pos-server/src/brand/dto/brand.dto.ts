import { ApiProperty } from "@nestjs/swagger";

export class BrandDto {

    @ApiProperty()
    brandCode: string;

    @ApiProperty()
    brandName: string;

    @ApiProperty()
    description: string;
    
}