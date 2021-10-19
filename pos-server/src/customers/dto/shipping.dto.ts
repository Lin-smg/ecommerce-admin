import { ApiProperty } from "@nestjs/swagger";

export class ShippingDto {

    @ApiProperty()
    customerId: number;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    region: string;
    
    @ApiProperty()
    phone: string;

    @ApiProperty()
    note: string;

    @ApiProperty()
    city: string;    
}