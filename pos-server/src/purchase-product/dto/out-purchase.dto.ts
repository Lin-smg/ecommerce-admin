import { HttpStatus } from "@nestjs/common";
import { Type } from "class-transformer";
import { CreatePurchaseDto } from "./create-purchase.dto";

export class OutPurchaseDto {
    @Type(() => CreatePurchaseDto)
    data: CreatePurchaseDto;

    code:number = HttpStatus.OK;

}
