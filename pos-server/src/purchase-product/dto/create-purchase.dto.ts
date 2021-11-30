import { CreatePurchaseProductDto } from "./create-purchase-product.dto";

export class CreatePurchaseDto {

    invoiceNo: string;

    registerNo: string;

    supplierId: number;

    supplierName: string;
        
    date: Date;

    casherName: string;

    total: number;

    status: string;

    remark: string;

    purchaseItemsList: CreatePurchaseProductDto[]

}
