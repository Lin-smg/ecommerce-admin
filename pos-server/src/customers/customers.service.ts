import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Customers } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Any } from 'typeorm';
import { CustomersDto } from './dto/customers.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class CustomersService {
  
   
    constructor(
        @InjectRepository(Customers)
        private readonly customersRepository: Repository<Customers>,

    ) { }

    async create(options: { item: Customers; }): Promise<any> {
       
        try {
            
            options.item.createDateTime = new Date();
            return await this.customersRepository.save(options.item);
         

        }  catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Customer Name is already exists.')
            }            
            throw error;
        }   
    }




    async update(options: { id: any; item: Customers; }): Promise<any> {
      
        try {
            await this.findById({ id: options.id });  
            await this.customersRepository.update({id: options.id},options.item);
            return options.item
           } catch (error) {
             throw error;  
           }
         
    }

    async delete(options: { item: Customers; }): Promise<any> {
        try {
            await this.findById({ id: options.item.id });  
            const customer = await this.findById({ id: options.item.id });  
            customer.delFlg = '1';
            await this.customersRepository.update({id: customer.id},customer);
            return options.item;
        } catch (error) {
            throw error;  
        }
    }

    async findById(options: { id: any; }) {
        try {
               
            const item = await this.customersRepository.findOneOrFail({
                where: {
                    id: options.id
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`Deleted Customer is not founded`);
        }
    }

    async getCustomers(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }){
        try {
            let objects: [Customers[], number];
            let qb = this.customersRepository.createQueryBuilder('customer');
            qb = qb.where('customer.delFlg = :d',{
                d: '0'
            });
            if (options.q) {
                qb = qb.where('customer.name like :q', {
                    q: `%${options.q}%`,
                });
            }
            options.sort = options.sort && new Customers().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('customer.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('customer.' + field, 'ASC');
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
                data: plainToClass(CustomersDto,objects[0]),
                meta: plainToClass(PageMetaDto,metaPage)
                // data: plainToClass(CustomersDto,objects[0]),
                // meta: plainToClass(PageMetaDto,metaPage)
            }; 
        } catch (error) {
            throw new error;
        }
     
    }
}
