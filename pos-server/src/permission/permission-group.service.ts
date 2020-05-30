import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { PermissionGroup } from './permission-group.entity';
import { PermissionGroupDto } from './dto/permission-group.dto';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class PermissionGroupService {

    constructor(
        @InjectRepository(PermissionGroup)
        public readonly permissionGroupRepository: Repository<PermissionGroup>,
    ) { }

    async findWithGroupCode(options: { groupcode: string; }) {
        try {

            const item = await this.permissionGroupRepository.findOne({
                where: [
                    { groupCode: options.groupcode }
                ],
            });

            return plainToClass(PermissionGroupDto, item);

        } catch (error) {
            throw new NotFoundException(`Group Permissions with "${options.groupcode}" not found`);
        }
    }


    async getPermissionGroup(options: { curPage: number; perPage: number; q?: string; group?: number; sort?: string }
    ) {
        try {
            let objects: [PermissionGroup[], number];
            let qb = this.permissionGroupRepository.createQueryBuilder('permissiongroup');
            if (options.q) {
                qb = qb.where('user.username like :q or user.position like :q or user.userid = :id', {
                    q: `%${options.q}%`,
                    id: +options.q
                });
            }
            options.sort = options.sort && new PermissionGroup().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('permissiongroup.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('permissiongroup.' + field, 'ASC');
                }
            }
            qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
            objects = await qb.getManyAndCount();
            let metaPage = {
                perPage: options.perPage,
                totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
                totalResults: objects[1],
                curPage: options.curPage
            }
            return {
                data: plainToClass(PermissionGroupDto, objects[0]),
                meta: plainToClass(PageMetaDto, metaPage)
            };
        } catch (error) {
            throw error;
        }
    }


    //Update

    async update(options: { groupcode: string; item: PermissionGroup; }): Promise<any> {
        try {
            await this.permissionGroupRepository.update({ groupCode: options.groupcode }, options.item);
            return await this.findByGroupOrName({ parameter: options.item.groupCode });
        } catch (error) {
            throw error;
        }
    }


    // Create
    async create(options: { item: PermissionGroup; }) {
        try {
            await this.isExistWithGropCodeAndName({
                groupCode: options.item.groupCode,
                groupName: options.item.groupName
            });

            options.item = await this.permissionGroupRepository.save(options.item);

            return options.item;

        } catch (error) {

            throw error;
        }
    }
    async isExistWithGropCodeAndName(options: { groupCode: string; groupName: string; }) {
        let permissionGroupData;
        if (options.groupCode) {

            try {
                permissionGroupData = await this.findByGroupOrName({ parameter: options.groupCode });
            } catch (error) {
                permissionGroupData = undefined;
            }
        }
        if (options.groupName) {
            try {
                permissionGroupData = await this.findByGroupOrName({ parameter: options.groupName });
            } catch (error) {
                permissionGroupData = undefined;
            }

        }

        if (permissionGroupData && (permissionGroupData.permissionGroup.groupCode === options.groupCode
            || permissionGroupData.permissionGroup.groupName === options.groupName)
        ) {
            throw new ConflictException(`Group Permissions with "${options.groupCode}" or "${options.groupName}" is exists`);
        }
    }
    async findByGroupOrName(options: { parameter: string; }) {
        try {

            const item = await this.permissionGroupRepository.findOne({
                where: [
                    { groupCode: options.parameter },
                    { groupName: options.parameter }
                ],
            });

            return item;

        } catch (error) {
            throw new NotFoundException(`Group Permissions with "${options.parameter}" not found`);
        }
    }

    async getAllPermissionGroup() {
        try {
            let permissionGroup = await this.permissionGroupRepository.find();
            return plainToClass(PermissionGroupDto, permissionGroup);
        } catch (error) {
            throw (error)
        }
    }
}
