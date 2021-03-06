import { Entity, Column, BeforeInsert, } from "typeorm";
import { BaseEntity } from "../common/base.entity";
import { AuthUser } from "../common/decorators/auth-user.decorator";


@Entity({ name: 'users' })
export class User extends BaseEntity {
    
    @Column({ unique: true, nullable: false })
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

    @Column({ nullable: true})
    position: string;

    @Column({ nullable: true})
    email: string;

    @Column({ nullable: true})
    phone: string;

    @Column({ nullable: true})
    imagePath: string;

    
}
