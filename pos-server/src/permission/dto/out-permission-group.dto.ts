import { ApiProperty } from "@nestjs/swagger";
import { PermissionGroupDto } from "./permission-group.dto";
import { PageMetaDto } from "../../common/dto/page_meta.dto";
import { Type } from "class-transformer";


export class OutPermissionGroupDto{
    @Type(() => PermissionGroupDto)
    @ApiProperty({ type: PermissionGroupDto })
    data: PermissionGroupDto;
}
