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
           await this.isExistCatergoryCode(options.item.categoryCode)
           options.item.createDateTime = new Date();
           return { data: await this.categoryRepository.save(options.item)};
        } 
        catch (error) {          
            throw error;
        }   
    }
    async isExistCatergoryCode(categoryCode: string) {
        try{
          const data = await this.categoryRepository.findOne({categoryCode: categoryCode, delFlg: '0'})
          if(data){
            throw new NotAcceptableException('Category is already exists.')
          }
        }catch(error){
          throw error;
        }
       
    }
// Category Delete
    async delete(options: { item: Category; }): Promise<any> {
        try {            
            const category = await this.findByCategoryCode({ categoryCode: options.item.categoryCode });  
            category.delFlg = '1';
            await this.categoryRepository.update({categoryCode: category.categoryCode},category);
            return { data: options.item };
        } catch (error) {
            throw error;  
        }
    }    
    //Update Category
    async update(options: { categoryCode: string; item: Category; }): Promise<any> {
        try {
            await this.findByCategoryCode({ categoryCode: options.categoryCode });  
            await this.categoryRepository.update({categoryCode: options.categoryCode},options.item);
            return {data: options.item};
        } catch (error) {
            throw error;  
        }
    } 
    async findByCategoryCode(options: { categoryCode: string; }) {
        try {
           
            return await this.categoryRepository.findOneOrFail({
                where: {
                    categoryCode: options.categoryCode , delFlg: '0'
                },
            });    
        } catch (error) {
            throw new NotFoundException(`This Category is not found`);
        }
    }
    async findByMainCategoryCode(options: { mainCategoryCode: string; }) {
        try {
           
            return await this.categoryRepository.findOneOrFail({
                where: {
                    mainCategoryCode: options.mainCategoryCode , delFlg: '0'
                },
            });    
        } catch (error) {
            return false
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
            qb = qb.andWhere('category.categoryCode like :q OR LOWER(category.categoryName) like LOWER(:q)', {
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
        
        // eslint-disable-next-line prefer-const
        objects = await qb.getManyAndCount();
        const metaPage = {
            perPage: options.perPage,
            totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
            totalResults: objects[1],
            curPage: options.curPage
        }
    
        return {
            data: plainToClass(CategoryDto,objects[0]),
            meta: plainToClass(PageMetaDto,metaPage)
        };
       } catch (error) {
           throw new error;
       } 
    }

    
    async getAllCategory() {
        let objects: [Category[], number];
        let qb = this.categoryRepository.createQueryBuilder('category');
        qb = qb.where('category.delFlg = :d' ,{
            d: '0',
        });
        // eslint-disable-next-line prefer-const
        objects = await qb.getManyAndCount();
        return await plainToClass(CategoryDto, objects[0]);
       }
    
}
