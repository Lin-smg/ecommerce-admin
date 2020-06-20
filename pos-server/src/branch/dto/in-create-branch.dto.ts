import { ApiProperty } from "@nestjs/swagger";

export class InCreateBranchDto {

    @ApiProperty()
    readonly code: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly phone: string;

    @ApiProperty()
    readonly address: string;

}