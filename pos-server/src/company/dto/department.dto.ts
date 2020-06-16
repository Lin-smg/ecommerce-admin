import { ApiProperty } from "@nestjs/swagger";


export class DepartmentDto{
    @ApiProperty()
    deptCode: string;

    @ApiProperty()
    deptName: string;

    @ApiProperty()
    deptAddress: string;

    @ApiProperty()
    deptPhone: string;

    
    @ApiProperty()
    companyCode: string;



}
