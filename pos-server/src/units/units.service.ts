import { Injectable, NotFoundException, NotAcceptableException, ConflictException, Options } from '@nestjs/common';
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
           await this.findByByUnitName({unitName: options.item.unitName}); 
           options.item.createDateTime = new Date();
           return { data: await this.unitsRepository.save(options.item)};

        } catch (error) {           
            throw error;
        }   
    }
    async findByByUnitName(options: { unitName: string; }) {
        let unit;
        try {
            unit = await this.unitsRepository.findOneOrFail({ unitName: options.unitName,delFlg: '0' });
        } catch (error) {
            unit = undefined;
        }
        if (unit && unit.unitName === options.unitName) {
            throw new ConflictException(`User with userId "${options.unitName}" is exists`);
        }
    }

    async delete(options: { item: Units; }): Promise<any> {
        try {
            await this.findChildById({ id: options.item.id });  
            const unit = await this.findById({ id: options.item.id });  
            unit.delFlg = '1';
            await this.unitsRepository.update({id: unit.id},unit);
            return {data: options.item };
        } catch (error) {
            throw error;  
        }
    }
    async findChildById(options: { id: number; }) {
        let item;
        try {
           
            item = await this.unitsRepository.findOne({
                where: {
                    childUnitId: options.id,
                    delFlg: '0'
                },
            });
            
        } catch (error) {
          return error;  
        }
        if(item){
            throw new NotAcceptableException('Unit Name is already used in Another Child.')  
        }

    }
    async update(options: { id: any; item: Units; }): Promise<any> {
        try {
            await this.findById({ id: options.id });  
            await this.unitsRepository.update({id: options.id, delFlg: '0'},options.item);
            return {data: options.item};
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
                    id: options.id,
                    delFlg: '0'
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
            all: plainToClass(UnitsDto,await this.unitsRepository.find({delFlg: '0',childUnitId: null})),
            meta: plainToClass(PageMetaDto,metaPage)
        };
       } catch (error) {
           throw new error;
       } 
    }

    async getSmallestUnit() {
        let objects: [Units[], number];
        let qb = this.unitsRepository.createQueryBuilder('unit');
        qb = qb.where('unit.delFlg = :d AND ( unit.childUnitId is null OR unit.childUnitId = :i)' ,{
            d: '0',
            i: ''
        });
        // eslint-disable-next-line prefer-const
        objects = await qb.getManyAndCount();
        return await plainToClass(UnitsDto, objects[0]);
    }

    async getParentUnitWithId(options: { id: number; }){
        let objects: [Units[], number];
        let qb = this.unitsRepository.createQueryBuilder('unit');
        qb = qb.where('unit.delFlg = :d AND ( unit.childUnitId = :i OR unit.id = :i )' ,{
            d: '0',
            i: options.id
        });
        // eslint-disable-next-line prefer-const
        objects = await qb.getManyAndCount();
        return {data: await plainToClass(UnitsDto, objects[0])};
    }
    

}
