import { ProductOrderDto } from "./product-order.dto";
import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";

export class OutProductOrderDto {
    @Type(() => ProductOrderDto)
    data: ProductOrderDto;

    code:number = HttpStatus.OK;

}