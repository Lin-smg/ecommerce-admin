import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'products_purchase' })
export class ProductsPurchase extends BaseEntity {

    @Column({ name: 'invoice_no', nullable: false })
    invoiceNo: string;

    @Column({ name: 'register_no', nullable: true })
    registerNo: string;

    @Column({ name: 'supplier_id', nullable: true })
    supplierId: number;

    @Column({ name: 'supplier_name', nullable: true })
    supplierName: string;
        
    @Column({ name: 'purchase_date',type: 'date', nullable: true })
    date: Date;

    @Column({ name: 'casher_name', nullable: true })
    casherName: string;

    @Column({name: 'total', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ name: 'status'})
    status: string;

    @Column({ name: 'remark'})
    remark: string;


}
