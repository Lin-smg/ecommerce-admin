import { ApiProperty } from "@nestjs/swagger";
import { DepartmentDto } from "./department.dto";


export class InCompanyDto{

    @ApiProperty()
    companyCode: string;
   
    @ApiProperty()
    companyName: string;

    @ApiProperty()
    companyType: string;

    @ApiProperty()
    companyPhone: string;

    @ApiProperty()
    companyEmail: string;

    @ApiProperty()
    companyAddress: string;

    @ApiProperty()
    companyLogo: string

}
