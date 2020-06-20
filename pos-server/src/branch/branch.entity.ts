import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'branch' })
export class Branch extends BaseEntity {
    
    @Column({ name: 'code', nullable: false })
    code: string;

    @Column({ name: 'name', nullable: false, })
    name: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'address', nullable: true })
    address: string;
}
