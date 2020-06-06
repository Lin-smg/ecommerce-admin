import { Column, Entity} from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity()
export class Company extends BaseEntity {

    @Column({ name:'company_code' ,unique: true, nullable: false })
    companyCode: string;

    @Column({ name:'company_name' ,unique: true, nullable: false })
    companyName: string;

    @Column({ name:'company_type', nullable: false })
    companyType: string;

    @Column({ name:'company_address', nullable: false })
    companyAddress: string;

    @Column()
    companyLogo: string;
}