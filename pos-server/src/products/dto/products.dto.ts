import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProductsDto {

    @ApiProperty()
    productCode: string;

    @ApiProperty()
    productName: string;
        
    @ApiPropertyOptional()
    categoryCode: string;

    @ApiPropertyOptional()
    categoryName: string;

    @ApiPropertyOptional()
    brandCode: string;

    @ApiPropertyOptional()
    brandName: string;

    @ApiPropertyOptional()
    unitId: number;

    @ApiPropertyOptional()
    unitName: string;

    @ApiPropertyOptional()
    unitPrice: number;

    @ApiPropertyOptional()
    expDate: Date;
    
    @ApiPropertyOptional()
    taxPercent: number;

    @ApiPropertyOptional()
    reOrder: number;

    @ApiPropertyOptional()
    description: string;
    
    @ApiPropertyOptional()
    imgPath: string;
}