import { ApiProperty } from "@nestjs/swagger";

export class PermissionDto {
    
    @ApiProperty()
    permissionCode: string;

    @ApiProperty()
    permissionName: string;

    @ApiProperty()
    menuCode: string;

    @ApiProperty()
    menuName: string;
    
    @ApiProperty()
    buttonCode: string;

    @ApiProperty()
    buttonName: string;

    @ApiProperty()
    order: string;

}
