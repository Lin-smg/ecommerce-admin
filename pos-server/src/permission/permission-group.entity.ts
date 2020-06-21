import { Entity, Column } from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: 'permissions_group' })
export class PermissionGroup extends BaseEntity {
    
    @Column({ name:'group_code' ,unique: true, nullable: false })
    groupCode: string;

    @Column({ name:'grop_name' ,nullable: false })
    groupName: string;

    @Column({ name:'permissions' ,nullable: false,type: "text"})
    permissions: string;

}
