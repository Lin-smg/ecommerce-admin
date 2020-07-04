import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'products_order' })
export class ProductsOrder extends BaseEntity {

    @Column({ name: 'receipt_no', nullable: false })
    receiptNo: number;

    @Column({ name: 'customer_id', nullable: true })
    customerId: number;

    @Column({ name: 'customer_name', nullable: true })
    customerName: string;
        
    @Column({ name: 'order_date',type: 'date', nullable: true })
    date: Date;

    @Column({ name: 'casher_name', nullable: true })
    casherName: string;

    @Column({name: 'sub_total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    subTotal: number;

    @Column({name: 'other_total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    otherTotal: number;

    @Column({name: 'total_tax', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    totalTax: number;

    @Column({name: 'total_Discount', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    totalDiscount: number;

    @Column({name: 'total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({name: 'old_credit_amount', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    oldCreditAmount: number;

    @Column({name: 'grand_total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    grandtotal: number;

    @Column({name: 'paid_amount', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    paidAmount: number;

    @Column({name: 'change', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    change: number;
    
    @Column({name: 'credit_amount', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    creditAmount: number;

    @Column({ name: 'due_date',type: 'date', nullable: true })
    dueDate: Date;

    @Column({ name: 'status', default: 'open' })
    status: string;

    @Column({ name: 'payment_type' })
    paymentType: string;


}
