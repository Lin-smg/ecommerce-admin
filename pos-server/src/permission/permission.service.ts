import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { PermissionDto } from './dto/permission.dto';

const permissionList = [
    {
        "permissionCode": "M000B00",
        "permissionName": "Dashboard",
        "menuCode": "M000",
        "menuName": "Dashboard",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M001B00",
        "permissionName": "Company",
        "menuCode": "M001",
        "menuName": "Company",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M001B01",
        "permissionName": "New",
        "menuCode": "M001",
        "menuName": "Company",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M001B02",
        "permissionName": "Edit",
        "menuCode": "M001",
        "menuName": "Company",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M001B03",
        "permissionName": "Delete",
        "menuCode": "M001",
        "menuName": "Company",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M002B00",
        "permissionName": "Permission Group",
        "menuCode": "M002",
        "menuName": "Permission Group",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M002B01",
        "permissionName": "New",
        "menuCode": "M002",
        "menuName": "Permission Group",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M002B02",
        "permissionName": "Edit",
        "menuCode": "M002",
        "menuName": "Permission Group",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M002B03",
        "permissionName": "Delete",
        "menuCode": "M002",
        "menuName": "Permission Group",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M003B00",
        "permissionName": "User",
        "menuCode": "M003",
        "menuName": "User",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M003B01",
        "permissionName": "New",
        "menuCode": "M003",
        "menuName": "User",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M003B02",
        "permissionName": "Edit",
        "menuCode": "M003",
        "menuName": "User",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M003B03",
        "permissionName": "Delete",
        "menuCode": "M003",
        "menuName": "User",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M004B00",
        "permissionName": "Customer",
        "menuCode": "M004",
        "menuName": "Customer",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M004B01",
        "permissionName": "New",
        "menuCode": "M004",
        "menuName": "Customer",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M004B02",
        "permissionName": "Edit",
        "menuCode": "M004",
        "menuName": "Customer",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M004B03",
        "permissionName": "Delete",
        "menuCode": "M004",
        "menuName": "Customer",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M005B00",
        "permissionName": "Supplier",
        "menuCode": "M005",
        "menuName": "Supplier",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M005B01",
        "permissionName": "New",
        "menuCode": "M005",
        "menuName": "Supplier",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M005B02",
        "permissionName": "Edit",
        "menuCode": "M005",
        "menuName": "Supplier",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M005B03",
        "permissionName": "Delete",
        "menuCode": "M005",
        "menuName": "Supplier",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M006B00",
        "permissionName": "Branch",
        "menuCode": "M006",
        "menuName": "Branch",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M006B01",
        "permissionName": "New",
        "menuCode": "M006",
        "menuName": "Branch",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M006B02",
        "permissionName": "Edit",
        "menuCode": "M006",
        "menuName": "Branch",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M006B03",
        "permissionName": "Delete",
        "menuCode": "M006",
        "menuName": "Branch",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M007B00",
        "permissionName": "Warehouse",
        "menuCode": "M007",
        "menuName": "Warehouse",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M007B01",
        "permissionName": "New",
        "menuCode": "M007",
        "menuName": "Warehouse",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M007B02",
        "permissionName": "Edit",
        "menuCode": "M007",
        "menuName": "Warehouse",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M007B03",
        "permissionName": "Delete",
        "menuCode": "M007",
        "menuName": "Warehouse",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M008B00",
        "permissionName": "Category",
        "menuCode": "M008",
        "menuName": "Category",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M008B01",
        "permissionName": "New",
        "menuCode": "M008",
        "menuName": "Category",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M008B02",
        "permissionName": "Edit",
        "menuCode": "M008",
        "menuName": "Category",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M008B03",
        "permissionName": "Delete",
        "menuCode": "M008",
        "menuName": "Category",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M009B00",
        "permissionName": "Brand",
        "menuCode": "M009",
        "menuName": "Brand",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M009B01",
        "permissionName": "New",
        "menuCode": "M009",
        "menuName": "Brand",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M009B02",
        "permissionName": "Edit",
        "menuCode": "M009",
        "menuName": "Brand",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M009B03",
        "permissionName": "Delete",
        "menuCode": "M009",
        "menuName": "Brand",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M010B00",
        "permissionName": "Product",
        "menuCode": "M010",
        "menuName": "Product",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M010B01",
        "permissionName": "New",
        "menuCode": "M010",
        "menuName": "Product",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M010B02",
        "permissionName": "Edit",
        "menuCode": "M010",
        "menuName": "Product",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M010B03",
        "permissionName": "Delete",
        "menuCode": "M010",
        "menuName": "Product",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    },
    {
        "permissionCode": "M011B00",
        "permissionName": "UnitOfMeasure",
        "menuCode": "M011",
        "menuName": "UnitOfMeasure",
        "buttonCode": "B00",
        "buttonName": "Menu",
        "order": null
    },
    {
        "permissionCode": "M011B01",
        "permissionName": "New",
        "menuCode": "M011",
        "menuName": "UnitOfMeasure",
        "buttonCode": "B01",
        "buttonName": "New",
        "order": null
    },
    {
        "permissionCode": "M011B02",
        "permissionName": "Edit",
        "menuCode": "M011",
        "menuName": "UnitOfMeasure",
        "buttonCode": "B02",
        "buttonName": "Edit",
        "order": null
    },
    {
        "permissionCode": "M011B03",
        "permissionName": "Delete",
        "menuCode": "M011",
        "menuName": "UnitOfMeasure",
        "buttonCode": "B03",
        "buttonName": "Delete",
        "order": null
    }]
@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        public readonly permissionRepository: Repository<Permission>,
        private connection: Connection,
    ) { }
    async getAllPermission() {
        try {
            const permission = await this.permissionRepository.find();
            return plainToClass(PermissionDto, permission);

        } catch (error) {
            throw (error)
        }
    }

    async createDefaultPermission() {
        try {
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            for (const data of permissionList) {
                await queryRunner.manager.save(plainToClass(Permission, data))
            }
            await queryRunner.commitTransaction();

            return {
                message: "default permission created Successfully"
            }

        } catch (error) {
            console.log(error);
            throw error
        }
    }
}
