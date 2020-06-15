import { BaseEntity } from "../common/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Department extends BaseEntity{

    @Column({ name:'dept_code' ,unique: true, nullable: false })
    deptCode: string;

    @Column({ name:'dept_name' ,unique: true, nullable: false })
    deptName: string;

    @Column({ name:'dept_address' , nullable: false })
    deptAddress: string;

    @Column({ name:'dept_phone' , nullable: false })
    deptPhone: string;

    @Column({ name:'company_code' , nullable: false })
    companyCode: string;

}