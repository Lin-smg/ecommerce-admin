import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude } from "class-transformer";


export class UsersDto {

    @ApiProperty()
    userid: string;

    @ApiProperty()
    username: string;

    @Exclude()
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

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    phone: string;

    @ApiPropertyOptional()
    imagePath: string;

}