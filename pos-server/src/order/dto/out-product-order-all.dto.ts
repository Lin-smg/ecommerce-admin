import { ProductOrderDto } from "./product-order.dto";
import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "src/common/dto/page_meta.dto";

export class OutProductOrderAllDto {
    @Type(() => ProductOrderDto)
    @ApiProperty({type: ProductOrderDto, isArray: true})
    data: ProductOrderDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({default: HttpStatus.OK })
    code: number = HttpStatus.OK;

}