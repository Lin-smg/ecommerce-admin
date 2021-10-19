import { BaseEntity } from "../../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'order' })
export class Order extends BaseEntity {

    @Column({ name: 'order_no', nullable: false })
    orderNo: string;

    @Column({ name: 'customer_id', nullable: true })
    customerId: number;

    @Column({ name: 'customer_name', nullable: true })
    customerName: string;
        
    @Column({ name: 'order_date',type: 'date', nullable: true })
    date: Date;

    @Column({name: 'sub_total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    subTotal: number;

    @Column({name: 'other_total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    otherTotal: number;

    @Column({name: 'shipping', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    shipping: number;

    @Column({name: 'total_tax', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    totalTax: number;

    @Column({name: 'total_Discount', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    totalDiscount: number;

    @Column({name: 'total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({name: 'grand_total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    grandtotal: number;
    
    @Column({ name: 'due_date',type: 'date', nullable: true })
    dueDate: Date;

    @Column({ name: 'status', default: 'open' })
    status: string;

    @Column({ name: 'payment_type', nullable: true })
    paymentType: string;

    @Column({ name: 'payment_status', nullable: true })
    paymentStatus: string;

    @Column({ name: 'operator_account', nullable: true })
    operatorName: string;

    @Column({ name: 'operator_name', nullable: true })
    operatorAccount: string;

    @Column({ name: 'remark', nullable: true })
    remark: string;
    
    @Column({ name: 'shipping_id', nullable: true })
    shippingId: number;


    
    @Column({nullable: true })
    fullName: string;

    @Column({nullable: true })
    address: string;

    @Column({ nullable: true})
    city: string;

    @Column({nullable: true })
    region: string;

    @Column({  nullable: true})
    phone: string;

    @Column({ nullable: true})
    note: string;
}
