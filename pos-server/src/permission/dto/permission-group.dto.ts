import { ApiProperty } from "@nestjs/swagger";


export class PermissionGroupDto{
    @ApiProperty()
    groupCode: string;

    @ApiProperty()
    groupName: string;

    @ApiProperty()
    permissions: string;

}
