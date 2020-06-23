import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class InCreateProductsDto {

    @ApiProperty()
    productCode: string;

    @ApiProperty()
    productName: string;
        
    @ApiPropertyOptional()
    @IsOptional()
    categoryCode: string;

    @ApiPropertyOptional()
    @IsOptional()
    categoryName: string;

    @ApiPropertyOptional()
    @IsOptional()
    brandCode: string;

    @ApiPropertyOptional()
    @IsOptional()
    brandName: string;

    @ApiPropertyOptional()
    unitId: number;

    @ApiPropertyOptional()
    unitName: string;

    @ApiPropertyOptional()
    @IsOptional()
    unitPrice: number;

    @ApiPropertyOptional()
    @IsOptional()    
    expDate: Date;
    
    @ApiPropertyOptional()
    @IsOptional()
    taxPercent: number;

    @ApiPropertyOptional()
    @IsOptional()
    reOrder: number;

    @ApiPropertyOptional()
    @IsOptional()
    description: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    imgPath: string;

}