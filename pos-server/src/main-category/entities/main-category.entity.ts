import { BaseEntity } from "../../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({name: "main-category"})
export class MainCategory extends BaseEntity {
    @Column({name: 'category_code', nullable: false})
    categoryCode: string;

    @Column({ name: 'category_name', nullable: false, })
    categoryName: string;

    @Column({ name: 'description', nullable: true })
    description: string;   
}
