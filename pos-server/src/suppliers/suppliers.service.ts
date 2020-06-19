import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Suppliers } from './suppliers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuppliersDto } from './dto/suppliers.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class SuppliersService {
       
    constructor(
        @InjectRepository(Suppliers)
        private readonly suppliersRepository: Repository<Suppliers>,
    ) { }

    async create(options: { item: Suppliers; }): Promise<any> {
        try {
           options.item.createDateTime = new Date();
           return await this.suppliersRepository.save(options.item);


        } catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Supplier Name is already exists.')
            }            
            throw error;
        }   
    }

    async delete(options: { item: Suppliers; }): Promise<any> {
        try {
            await this.findById({ id: options.item.id });  
            const supplier = await this.findById({ id: options.item.id });  
            supplier.delFlg = '1';
            await this.suppliersRepository.update({id: supplier.id},supplier);
            return options.item;
        } catch (error) {
            throw error;  
        }
    }

    async update(options: { id: any; item: Suppliers; }): Promise<any> {
        try {
            await this.findById({ id: options.id });  
            await this.suppliersRepository.update({id: options.id},options.item);
            return options.item;
        } catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Supplier Name is already exists.')
            }
            throw error;  
        }
    } 
    async findById(options: { id: any; }) {
        try {
           
            const item = await this.suppliersRepository.findOneOrFail({
                where: {
                    id: options.id
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`This Supplier is not found`);
        }
    }

    async getSuppliers(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }){
        try {
            let objects: [Suppliers[], number];
            let qb = this.suppliersRepository.createQueryBuilder('supplier');
            qb = qb.where('supplier.delFlg = :d',{
                d: '0'
            });
            if (options.q) {
                qb = qb.where('supplier.name like :q', {
                    q: `%${options.q}%`,
                });
            }
            options.sort = options.sort && new Suppliers().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('supplier.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('supplier.' + field, 'ASC');
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
                data: plainToClass(SuppliersDto,objects[0]),
                meta: plainToClass(PageMetaDto,metaPage)
            }; 
        } catch (error) {
            throw new error;
        }
     
    }
}
