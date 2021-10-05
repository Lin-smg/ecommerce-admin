import { TProductsSaleDto } from "./t-products-sale.dto";

export class InProductsSaleDto{

    receiptNo: string;

    customerId: number;

    customerName: string;

    date: Date;

    casherName: string;

    subTotal: number;

    otherTotal: number;

    totalTax: number;

    totalDiscount: number;
 
    total: number;

    oldCreditAmount: number;

    grandtotal: number;

    paidAmount: number;

    change: number;
    
    creditAmount: number;

    dueDate: Date;

    status: string;

    paymentType: string;

    paymentStatus: string;

    soldItemsList: TProductsSaleDto[];

    // otherChargesList: [];

}
