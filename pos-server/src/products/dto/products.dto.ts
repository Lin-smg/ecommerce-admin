import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProductsUnitsDto } from "./products-units.dto";

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
    supplierId: number;

    @ApiPropertyOptional()
    supplierName: string;
    
    @ApiPropertyOptional()
    unitId: number;

    @ApiPropertyOptional()
    unitName: string;

    @ApiPropertyOptional()
    unitPrice: number;

    unitCost: number;

    unitQty: number;

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
   
    unit: ProductsUnitsDto[];
}