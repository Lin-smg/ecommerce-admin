import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class InCreateUsersDto {

    @ApiProperty()
    readonly userid: string;

    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;

    @ApiProperty()
    readonly permissions: string;

    @ApiProperty()
    readonly departmentpermissions: string;

    @ApiProperty()
    @IsOptional()
    readonly isActive: boolean;

    @ApiPropertyOptional()
    @IsOptional()
    readonly position: string;

    @ApiProperty()
    @IsOptional()
    readonly department: string;

    @ApiProperty()
    @IsOptional()
    readonly departmentname: string;

    @ApiPropertyOptional()
    @IsOptional()
    readonly email: string;

    @ApiPropertyOptional()
    @IsOptional()
    readonly phone: string;

    @ApiPropertyOptional()
    @IsOptional()
    readonly imagePath: string;

    @ApiProperty()
    readonly role: string;

}