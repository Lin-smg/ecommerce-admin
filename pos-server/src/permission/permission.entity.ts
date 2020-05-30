import { Entity, Column, BeforeInsert, } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
    
    @Column({ name:'permission_code' ,unique: true, nullable: false })
    permissionCode: string;

    @Column({ name:'permission_name' ,nullable: false })
    permissionName: string;

    @Column({ name:'menu_code' ,nullable: false})
    menuCode: string;

    @Column({ name:'menu_name' ,nullable: false})
    menuName: string;
    
    @Column({ name:'button_code' ,nullable: false})
    buttonCode: string;

    @Column({ name:'button_name' ,nullable: false})
    buttonName: string;

    @Column({ nullable: true})
    order: string;

}
