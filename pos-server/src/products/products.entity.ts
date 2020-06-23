import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'products' })
export class Products extends BaseEntity {

    @Column({ name: 'product_code', nullable: true })
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

    @Column({ name: 'unit_name', nullable: false })
    unitName: string;

    @Column({name: 'unit_price', nullable: true})
    @Column('numeric',{ precision: 10, scale: 2 })
    unitPrice: number;

    @Column({ name: 'reorder', nullable: false })
    reOrder: number;

    @Column({ name: 'tax_percent', nullable: false })
    taxPercent: number;

    @Column({ name: 'exp_date',type: 'date', nullable: false })
    expDate: Date;
    
    @Column({ name: 'description', nullable: false })
    description: string;
    
    @Column({ name: 'imgpath', nullable: false })
    imgPath: string;
}
