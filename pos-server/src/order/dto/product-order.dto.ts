import { OrderItemDto } from "./order-item.dto";

export class ProductOrderDto{

    orderNo: string;

    customerId: number;

    customerName: string;

    date: Date;

    subTotal: number;

    otherTotal: number;

    shipping: number;

    totalTax: number;

    totalDiscount: number;
 
    total: number;

    grandtotal: number;
    
    dueDate: Date;

    status: string;

    paymentType: string;

    paymentStatus: string;

    operatorAccount: string;
    operatorName: string;
    remark: string;
    shippingId: number;

    orderItems: OrderItemDto[];

    fullName: string;

    address: string;

    city: string; 

    region: string;
    
    phone: string;

    note: string;

}
