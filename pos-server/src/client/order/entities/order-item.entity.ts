import { BaseEntity } from "../../../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'order_item' })
export class OrderItem extends BaseEntity {

    @Column({ name: 'order_no', nullable: false })
    orderNo: string;
    
    @Column({ name: 'product_id', nullable: false })
    productId: number;

    @Column({ name: 'product_code', nullable: false })
    productCode: string;

    @Column({ name: 'product_name', nullable: true })
    productName: string;

    @Column({ name: 'category_code', nullable: true })
    categoryCode: string;

    @Column({ name: 'category_name', nullable: true })
    categoryName: string;

    @Column({ name: 'brand_code', nullable: true })
    brandCode: string;

    @Column({ name: 'brand_name', nullable: true })
    brandName: string;
        
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
