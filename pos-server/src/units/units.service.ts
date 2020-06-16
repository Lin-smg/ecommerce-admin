import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Units } from './units.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsDto } from './dto/units.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class UnitsService {
       
    constructor(
        @InjectRepository(Units)
        private readonly unitsRepository: Repository<Units>,
    ) { }

    async create(options: { item: Units; }): Promise<any> {
        try {
           options.item.createDateTime = new Date();
           return await this.unitsRepository.save(options.item);


        } catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Unit Name is already exists.')
            }            
            throw error;
        }   
    }

    async delete(options: { item: Units; }): Promise<any> {
        try {
            await this.findChildById({ id: options.item.id });  
            const unit = await this.findById({ id: options.item.id });  
            unit.delFlg = '1';
            await this.unitsRepository.update({id: unit.id},unit);
            return options.item;
        } catch (error) {
            throw error;  
        }
    }
    async findChildById(options: { id: number; }) {
        let item;
        try {
           
            item = await this.unitsRepository.findOneOrFail({
                where: {
                    childUnitId: options.id
                },
            });
    
        } catch (error) {
          return;  
        }
        if(item){
            throw new NotAcceptableException('Unit Name is already used in Another Child.')  
        }

    }
    async update(options: { id: any; item: Units; }): Promise<any> {
        try {
            await this.findById({ id: options.id });  
            await this.unitsRepository.update({id: options.id},options.item);
           
        } catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Unit Name is already exists.')
            }
            throw error;  
        }
    } 
    async findById(options: { id: any; }) {
        try {
           
            const item = await this.unitsRepository.findOneOrFail({
                where: {
                    id: options.id
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`This Unit is not found`);
        }
    }

    async getUnits(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }){
       try {
        let objects: [Units[], number];
        let qb = this.unitsRepository.createQueryBuilder('unit');
        qb = qb.where('unit.delFlg = :d',{
            d: '0'
        });
        if (options.q) {
            qb = qb.andWhere('unit.unitName like :q OR unit.childUnitName like :q', {
                q: `%${options.q}%`,
            });
        }
        options.sort = options.sort && new Units().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
        const field = options.sort.replace('-', '');
        if (options.sort) {
            if (options.sort[0] === '-') {
                qb = qb.orderBy('unit.' + field, 'DESC');
            } else {
                qb = qb.orderBy('unit.' + field, 'ASC');
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
            data: plainToClass(UnitsDto,objects[0]),
            all: plainToClass(UnitsDto,await this.unitsRepository.find()),
            meta: plainToClass(PageMetaDto,metaPage)
        };
       } catch (error) {
           throw new error;
       } 
    }
}
