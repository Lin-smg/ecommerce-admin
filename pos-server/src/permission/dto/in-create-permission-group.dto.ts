import { ApiProperty } from "@nestjs/swagger";


export class InCreatePermissionGroupDto{
    @ApiProperty()
    readonly groupCode: string;

    @ApiProperty()
    readonly groupName: string;

    @ApiProperty()
    readonly permissions: string;

}
