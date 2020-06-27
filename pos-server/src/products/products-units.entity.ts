import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'products_units' })
export class ProductsUnits extends BaseEntity {

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

    @Column({name: 'purchase_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    purchasePrice: number;

    @Column({name: 'sellPrice_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0})
    sellPrice: number;
    
    @Column({ name: 'active_status',type: 'boolean', default: true })
    activeStatus: string;
    
    @Column({ name: 'effective_date',type: 'date', nullable: true })
    effectiveDate: Date;
}
