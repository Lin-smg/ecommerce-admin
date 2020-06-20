import { Entity, Column, } from "typeorm";
import { BaseEntity } from "../common/base.entity";
@Entity({ name: 'users' })
export class User extends BaseEntity {
    
    @Column({ nullable: false })
    userid: string;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false})
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({type: "text",default:'M000B00'})
    permissions: string;

    @Column({type: "text",default:'All'})
    departmentpermissions: string;

    @Column({ nullable: false})
    department: string;

    @Column({ nullable: true})
    position: string;

    @Column({ nullable: true})
    email: string;

    @Column({ nullable: true})
    phone: string;

    @Column({ nullable: true})
    imagePath: string;

    
}
