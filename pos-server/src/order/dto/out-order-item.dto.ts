
import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "src/common/dto/page_meta.dto";
import { OrderItemDto } from "./order-item.dto";

export class OutOrderItemDto {
    @Type(() => OrderItemDto)
    @ApiProperty({type: OrderItemDto, isArray: true})
    data: OrderItemDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({default: HttpStatus.OK })
    code: number = HttpStatus.OK;

}