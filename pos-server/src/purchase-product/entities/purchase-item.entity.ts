import { BaseEntity } from "../../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'purchase_items' })
export class PurchaseItems extends BaseEntity {
    
    @Column({ name: 'invoice_no', nullable: false })
    invoiceNo: string;

    @Column({ name: 'product_id', nullable: false })
    productId: number;

    @Column({ name: 'product_code', nullable: false })
    productCode: string;

    @Column({ name: 'product_name', nullable: true })
    productName: string;
        
    @Column({ name: 'unit_id', nullable: false })
    unitId: number;

    @Column({ name: 'unit_name', nullable: true })
    unitName: string;

    @Column({ name: 'child_unit_id', nullable: true })
    childUnitId: number;

    @Column({ name: 'child_unit_name', nullable: true })
    childUnitName: string;

    @Column({name: 'unit_cost', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    unitCost: number;

    @Column({name: 'cost', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    cost: number;

    @Column({name: 'sellPrice_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    sellPrice: number;
    
    @Column({ name: 'effective_date',type: 'date', nullable: true })
    effectiveDate: Date;

    @Column({ name: 'qty', default: 0 })
    qty: number;
}

