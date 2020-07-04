import { ProductsPurchaseDto } from "./products-purchase.dto";
import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";

export class OutProductsPurchaseDto {
    @Type(() => ProductsPurchaseDto)
    data: ProductsPurchaseDto;

    code:number = HttpStatus.OK;

}
