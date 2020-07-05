import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";
import { ProductsOrderDto } from "./products-order.dto";

export class OutProductsOrderDto {
    @Type(() => ProductsOrderDto)
    data: ProductsOrderDto;

    code:number = HttpStatus.OK;

}
