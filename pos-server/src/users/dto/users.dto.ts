import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
//import { Exclude } from "class-transformer";


export class UsersDto {

    @ApiProperty()
    userid: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    permissions: string;

    @ApiProperty()
    departmentpermissions: string;

    @ApiPropertyOptional()
    position: string;

    @ApiProperty()
    department: string;

    @ApiProperty()
    departmentname: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiPropertyOptional()
    imagePath: string;

    @ApiProperty()
    role: string;

}