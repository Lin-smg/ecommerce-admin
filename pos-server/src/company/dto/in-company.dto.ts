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
    companyAddress: string;

    @ApiProperty()
    companyLogo: string

    @ApiProperty({ type: DepartmentDto, isArray: true })
    department: DepartmentDto[];

    @ApiProperty({ type: DepartmentDto, isArray: true })
    olddepartment: DepartmentDto[];

}
