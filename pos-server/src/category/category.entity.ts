import { Entity, Column} from "typeorm";
import { BaseEntity } from "../common/base.entity";

@Entity({ name: 'category' })
export class Category extends BaseEntity {
    
    @Column({ name:'category_code' ,unique: true, nullable: false })
    categoryCode: string;

    @Column({ name:'category_name' ,nullable: false })
    categoryName: string;

    

}
