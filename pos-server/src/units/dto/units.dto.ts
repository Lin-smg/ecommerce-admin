import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UnitsDto {

    @ApiProperty()
    unitName: string;

    @ApiProperty()
    unitQty: number;

    @ApiProperty()
    childUnitId: string;

    @ApiProperty()
    childUnitName: string;

    @ApiProperty()
    childUnitQty: number;
    
  
}