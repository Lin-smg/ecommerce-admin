import { OrderItemDto } from "./order-item.dto";

export class ProductOrderDto{

    orderNo: string;

    customerId: number;

    customerName: string;

    date: Date;

    subTotal: number;

    otherTotal: number;

    totalTax: number;

    totalDiscount: number;
    
    shipping: number;
 
    total: number;

    grandtotal: number;
    
    dueDate: Date;

    status: string;

    paymentType: string;

    paymentStatus: string;

    shippingId: number;

    orderItems: OrderItemDto[];

    fullName: string;

    address: string;

    city: string; 

    region: string;
    
    phone: string;

    note: string;

}
