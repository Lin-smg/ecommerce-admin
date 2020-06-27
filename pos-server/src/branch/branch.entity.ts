import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'branch' })
export class Branch extends BaseEntity {
    
    @Column({ name: 'branch_code', nullable: false })
    code: string;

    @Column({ name: 'branch_name', nullable: false, })
    name: string;

    @Column({ name: 'branch_phone', nullable: true })
    phone: string;

    @Column({ name: 'branch_address', nullable: true })
    address: string;
}
