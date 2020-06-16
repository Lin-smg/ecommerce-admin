import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class InWarehousesDto{

    @ApiProperty()
    readonly wareHouseName: string;

    @ApiProperty()
    readonly location: string;

    @ApiProperty()
    readonly space: string;

    @ApiProperty()
    readonly remark: string;
   

}