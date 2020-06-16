import { Entity, Column, } from "typeorm";
import { BaseEntity } from "../common/base.entity";
@Entity({ name: 'warehouses' })
export class Warehouse extends BaseEntity {
    
    @Column({ name:'warehouse_name',unique: true, nullable: false })
    wareHouseName: string;

    @Column({ name:'location',nullable: true })
    location: string;

    @Column({ name:'space',nullable: true})
    space: string;

    @Column({ name:'remark',nullable: true})
    remark: string;
   

    
}
