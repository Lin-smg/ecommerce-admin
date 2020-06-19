import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class SuppliersDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    addressOne: string;

    @ApiProperty()
    addressTwo: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    stateOrProvince: string;

    @ApiProperty()
    zipCode: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    comments: string;

    @ApiProperty()
    internalNotes: string;

    @ApiProperty()
    companyName: string;

    @ApiProperty()
    account: string;
    
  
}