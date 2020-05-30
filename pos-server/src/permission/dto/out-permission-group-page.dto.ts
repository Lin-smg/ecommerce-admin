import { ApiProperty } from "@nestjs/swagger";
import { PermissionGroupDto } from "./permission-group.dto";
import { PageMetaDto } from "../../common/dto/page_meta.dto";
import { Type } from "class-transformer";


export class OutPermissionGroupPageDto{
    @Type(() => PermissionGroupDto)
    @ApiProperty({ type: PermissionGroupDto, isArray: true })
    data: PermissionGroupDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;

}
