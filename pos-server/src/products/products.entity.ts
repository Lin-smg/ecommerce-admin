import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'products' })
export class Products extends BaseEntity {

    @Column({ name: 'product_code', nullable: false })
    productCode: string;

    @Column({ name: 'product_name', nullable: false })
    productName: string;
        
    @Column({ name: 'category_code', nullable: true })
    categoryCode: string;

    @Column({ name: 'category_name', nullable: true })
    categoryName: string;

    @Column({ name: 'brand_code', nullable: true })
    brandCode: string;

    @Column({ name: 'brand_name', nullable: true })
    brandName: string;

    @Column({ name: 'supplier_id', nullable: true })
    supplierId: number;

    @Column({ name: 'supplier_name', nullable: true })
    supplierName: string;

    @Column({ name: 'unit_id', nullable: false })
    unitId: number;

    @Column({ name: 'unit_name', nullable: false })
    unitName: string;

    @Column({name: 'unit_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2, default: 0 })
    unitPrice: number;

    @Column({ name: 'reorder', default: 0, nullable: false })
    reOrder: number;

    @Column({ name: 'tax_percent', default: 0, nullable: false })
    taxPercent: number;

    @Column({ name: 'exp_date',type: 'date', nullable: true })
    expDate: Date;
    
    @Column({ name: 'description', nullable: true })
    description: string;
    
    @Column({ name: 'imgpath', nullable: true })
    imgPath: string;
}
