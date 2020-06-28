import { ApiProperty } from "@nestjs/swagger";

export class InCreateUnitsDto {

    @ApiProperty()
    readonly unitName: string;

    @ApiProperty()
    readonly unitQty: number;

    @ApiProperty()
    readonly childUnitId: string;

    @ApiProperty()
    readonly childUnitName: string;

    @ApiProperty()
    readonly childUnitQty: number;
}