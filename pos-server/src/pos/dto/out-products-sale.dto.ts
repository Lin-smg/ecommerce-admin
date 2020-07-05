import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";
import { ProductsSaleDto } from "./products-sale.dto";

export class OutProductsSaleDto {
    @Type(() => ProductsSaleDto)
    data: ProductsSaleDto;

    code:number = HttpStatus.OK;

}
