import { BaseEntity } from "../common/base.entity";
import { Entity, Column } from "typeorm";

@Entity({ name: 'suppliers' })
export class Suppliers extends BaseEntity {
    
    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone', nullable: true})
    phone: string;

    @Column({ name: 'image_url', nullable: true })
    imageUrl: string;

    @Column({  name: 'address_one', nullable: true})
    addressOne: string;

    @Column({ name: 'address_two', nullable: true , })
    addressTwo: string;

    @Column({ name: 'city', nullable: true , })
    city: string;

    @Column({ name: 'state_or_province', nullable: true , })
    stateOrProvince: string;

    @Column({ name: 'zip_code', nullable: true , })
    zipCode: string;

    @Column({ name: 'country', nullable: true , })
    country: string;

    @Column({ name: 'comments', nullable: true , })
    comments: string;

    @Column({ name: 'internal_notes', nullable: true , })
    internalNotes: string;

    @Column({ name: 'company_name', nullable: true , })
    companyName: string;

    @Column({ name: 'account', nullable: true , })
    account: string;
    
    
}
