import { ApiProperty } from "@nestjs/swagger";

export class BranchDto {

    @ApiProperty()
    code: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;
    
}