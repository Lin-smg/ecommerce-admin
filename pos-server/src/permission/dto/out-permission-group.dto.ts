import { ApiProperty } from "@nestjs/swagger";
import { PermissionGroupDto } from "./permission-group.dto";
import { Type } from "class-transformer";
import { HttpStatus } from "@nestjs/common";


export class OutPermissionGroupDto{
    @Type(() => PermissionGroupDto)
    @ApiProperty({ type: PermissionGroupDto })
    data: PermissionGroupDto;

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
