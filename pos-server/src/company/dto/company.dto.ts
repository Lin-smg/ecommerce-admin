import { ApiProperty } from "@nestjs/swagger";


export class CompanyDto{

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
