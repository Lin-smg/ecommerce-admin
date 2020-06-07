import { ApiProperty } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common";
import { CompanyDto } from "./company.dto";


export class OutCompanyDto{
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

    @ApiProperty({ type: CompanyDto })
    data: CompanyDto;

}
