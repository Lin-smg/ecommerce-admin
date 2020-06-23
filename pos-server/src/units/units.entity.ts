import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'units' })
export class Units extends BaseEntity {
    
    @Column({ name: 'unit_name', nullable: false })
    unitName: string;

    @Column({ name: 'unit_qty', nullable: false, default: 1 })
    unitQty: number;

    @Column({ name: 'child_unit_id', nullable: true })
    childUnitId: string;

    @Column({  name: 'child_unit_name', nullable: true})
    childUnitName: string;

    @Column({ name: 'child_unit_qty', nullable: true , })
    childUnitQty: number;
    
    
}
