import { ApiProperty } from "@nestjs/swagger";



export class WarehouseDto {

    @ApiProperty()
    wareHouseName: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    space: string;

    @ApiProperty()
    remark: string;
   

}