import { Entity, Column, } from "typeorm";
import { BaseEntity } from "../common/base.entity";
@Entity({ name: 'customers' })
export class Customers extends BaseEntity {
    
    @Column({nullable: false })
    name: string;

    @Column({nullable: false })
    email: string;

    @Column({nullable: true })
    password: string;

    @Column({  nullable: true})
    phone: string;

    @Column({ nullable: true})
    imageUrl: string;

    @Column({ nullable: true})
    addressOne: string;

    @Column({ nullable: true})
    addressTwo: string;

    @Column({ nullable: true})
    city: string;

    @Column({ nullable: true})
    stateOrProvince: string;

    @Column({ nullable: true})
    zipCode: string;

    @Column({ nullable: true})
    country: string;

    @Column({ nullable: true})
    comments: string;

    @Column({ nullable: true})
    internalNotes: string;

    @Column({ nullable: true})
    companyName: string;

    @Column({ nullable: true})
    account: string;

    @Column({ nullable: true})
    role: string;
    
}
