import { Injectable, NotFoundException } from '@nestjs/common';
import { Warehouse } from './warehouse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseDto } from './dto/warehouse.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class WarehouseService {
    
    
    
    constructor(
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>,
        
    ) { }

    async create(options: { item: Warehouse; }): Promise<any> {
        try {
            options.item.createDateTime=new Date();
            return await this.warehouseRepository.save(options.item);           
            

        } catch (error) {
            console.log(error);            
            throw error;
        }
    }

    async update(options: { id: any; item: Warehouse; }): Promise<any> {
        try {
            await this.findById({ id: options.id });  
            await this.warehouseRepository.update({id: options.id},options.item);
            
        } catch (error) {
            throw error;
        }
    }
   
    // find UserId
    async findById(options: { id: any }) {
        try {
           
            const item = await this.warehouseRepository.findOneOrFail({
                where: {
                    id: options.id
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`Deleted warehouse is not found`);
        }
    }


    async getWarehouse(options: { curPage: number; perPage: number; q: any; sort: string; group: number; }) {
        try {
            let objects: [Warehouse[], number];
            let qb = this.warehouseRepository.createQueryBuilder('warhouse');
            if (options.q) {
                qb = qb.where('warhouse.wareHouseName like :q or user.position like :q or user.userid = :id', {
                    q: `%${options.q}%`,
                    id: +options.q
                });
            }
            options.sort = options.sort && new Warehouse().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('warhouse.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('warhouse.' + field, 'ASC');
                }
            }
            qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
            // eslint-disable-next-line prefer-const
            objects = await qb.getManyAndCount();
            const metaPage = {
                perPage: options.perPage,
                totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
                totalResults: objects[1],
                curPage: options.curPage
            }
            return {
                data: plainToClass(WarehouseDto,objects[0]),
                meta: plainToClass(PageMetaDto,metaPage)
            };
            
        } catch (error) {
            throw new  error;
        }
    }
}

