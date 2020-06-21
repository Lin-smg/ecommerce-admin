import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'brand' })
export class Brand extends BaseEntity {
    
    @Column({ name: 'brand_code', nullable: false })
    brandCode: string;

    @Column({ name: 'brand_name', nullable: false, })
    brandName: string;

    @Column({ name: 'description', nullable: true })
    description: string;
}
