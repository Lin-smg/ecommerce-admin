import { ApiProperty } from "@nestjs/swagger";

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