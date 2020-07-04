import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 't_products_order' })
export class TproductsOrder extends BaseEntity {

    @Column({ name: 'receipt_no', nullable: false })
    receiptNo: number;
    
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

    @Column({name: 'sell_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    sellPrice: number;
    
    @Column({name: 'real_sell_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    realSellPrice: number;

    @Column({ name: 'qty', default: 0 })
    qty: number;

    @Column({name: 'price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    price: number;

    @Column({name: 'real_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    realPrice: number;

}
