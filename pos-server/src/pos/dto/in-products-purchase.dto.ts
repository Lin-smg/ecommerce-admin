import { TProductsPurchaseDto } from "./t-products-purchase.dto";

export class InProductsPurchaseDto {

    invoiceNo: string;

    registerNo: string;

    supplierId: number;

    supplierName: string;
        
    date: Date;

    casherName: string;

    total: number;

    status: string;

    remark: string;

    purchaseItemsList: TProductsPurchaseDto[]

}
