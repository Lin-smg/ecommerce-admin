import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class CategoryService {
       
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }
//Category Create
    async create(options: { item: Category; }): Promise<any> {
        try {
           options.item.createDateTime = new Date();
           return await this.categoryRepository.save(options.item);
        } 
        catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Category Name is already exists.')
            }            
            throw error;
        }   
    }
// Category Delete
    async delete(options: { categoryCode: any; item: Category; }): Promise<any> {
        try {            
            const Category = await this.findByCategoryCode({ categoryCode: options.categoryCode });  
            Category.delFlg = '1';
            await this.categoryRepository.update({categoryCode: Category.categoryCode},Category);
            return options.item;
        } catch (error) {
            throw error;  
        }
    }    
    //Update Category
    async update(options: { categoryCode: string; item: Category; }): Promise<any> {
        try {
            await this.findByCategoryCode({ categoryCode: options.categoryCode });  
            await this.categoryRepository.update({categoryCode: options.categoryCode},options.item);
            return options.item;
        } catch (error) {
            if(error.code === '23505'){
                throw new NotAcceptableException('Category Name is already exists.')
            }
            throw error;  
        }
    } 
    async findByCategoryCode(options: { categoryCode: string; }) {
        try {
           
            const item = await this.categoryRepository.findOneOrFail({
                where: {
                    categoryCode: options.categoryCode
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`This Category is not found`);
        }
    }
//Find Category
    async getCategory(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }){
       try {
        let objects: [Category[], number];
        let qb = this.categoryRepository.createQueryBuilder('category');
        qb = qb.where('category.delFlg = :d',{
            d: '0'
        });
        if (options.q) {
            qb = qb.andWhere('category.categoryCod like :q', {
                q: `%${options.q}%`,
            });
        }
        options.sort = options.sort && new Category().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
        const field = options.sort.replace('-', '');
        if (options.sort) {
            if (options.sort[0] === '-') {
                qb = qb.orderBy('category.' + field, 'DESC');
            } else {
                qb = qb.orderBy('category.' + field, 'ASC');
            }
        }
        qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
        
        objects = await qb.getManyAndCount();
        const metaPage = {
            perPage: options.perPage,
            totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
            totalResults: objects[1],
            curPage: options.curPage
        }
    
        return {
            data: plainToClass(CategoryDto,objects[0]),
            all: plainToClass(CategoryDto,await this.categoryRepository.find()),
            meta: plainToClass(PageMetaDto,metaPage)
        };
       } catch (error) {
           throw new error;
       } 
    }
}
