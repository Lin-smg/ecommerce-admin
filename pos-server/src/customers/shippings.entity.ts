import { Entity, Column, } from "typeorm";
import { BaseEntity } from "../common/base.entity";
@Entity({ name: 'shipping' })
export class Shipping extends BaseEntity {

    @Column({nullable: false })
    customerId: number;
    
    @Column({nullable: false })
    fullName: string;

    @Column({nullable: false })
    address: string;

    @Column({nullable: true })
    region: string;

    @Column({  nullable: true})
    phone: string;

    @Column({ nullable: true})
    note: string;

    @Column({ nullable: true})
    city: string;

    
}
