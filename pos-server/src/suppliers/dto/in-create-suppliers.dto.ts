import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class InCreateSuppliersDto {

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly imageUrl: string;

    @ApiProperty()
    readonly addressOne: string;

    @ApiProperty()
    readonly addressTwo: string;

    @ApiProperty()
    readonly city: string;

    @ApiProperty()
    readonly stateOrProvince: string;

    @ApiProperty()
    readonly zipCode: string;

    @ApiProperty()
    readonly country: string;

    @ApiProperty()
    readonly comments: string;

    @ApiProperty()
    readonly internalNotes: string;

    @ApiProperty()
    readonly companyName: string;

    @ApiProperty()
    readonly account: string;
}