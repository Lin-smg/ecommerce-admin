import { ApiProperty } from "@nestjs/swagger";

export class InCreateBrandDto {

    @ApiProperty()
    readonly brandCode: string;

    @ApiProperty()
    readonly brandName: string;

    @ApiProperty()
    readonly description: string;

}