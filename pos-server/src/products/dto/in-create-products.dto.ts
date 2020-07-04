import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { ProductsUnitsDto } from "./products-units.dto";
import { Type } from "class-transformer";

export class InCreateProductsDto {

    id: number;
    
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
    supplierId: number;

    @ApiPropertyOptional()
    supplierName: string;
    
    @ApiPropertyOptional()
    @IsOptional()
    unitId: number;

    @ApiPropertyOptional()
    @IsOptional()
    unitName: string;

    @ApiPropertyOptional()
    unitPrice: number;

    unitCost: number;

    productQty: number;

    type: string;

    packageSize: string;

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
      
    @Type(() => ProductsUnitsDto)
    unit: ProductsUnitsDto[]

}