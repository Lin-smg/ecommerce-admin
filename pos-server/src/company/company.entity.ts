import { Column, Entity} from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity()
export class Company extends BaseEntity {

    @Column({ name:'company_code' , nullable: false })
    companyCode: string;

    @Column({ name:'company_name' , nullable: false })
    companyName: string;

    @Column({ name:'company_type', nullable: true })
    companyType: string;

    @Column({ name:'company_address', nullable: true })
    companyAddress: string;

    @Column({ name:'company_phone', nullable: true })
    companyPhone: string;

    @Column({ name:'company_email', nullable: true })
    companyEmail: string;

    @Column({ name:'company_logo', nullable: true })
    companyLogo: string;
}