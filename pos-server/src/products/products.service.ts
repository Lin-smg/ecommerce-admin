import { Injectable, NotFoundException, ConflictException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository, Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ProductsDto } from './dto/products.dto';
import { PageMetaDto } from '../common/dto/page_meta.dto';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { UnitsService } from '../units/units.service';
import { InCreateProductsDto } from './dto/in-create-products.dto';
import { ProductsUnitsService } from './products-units.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        private connection: Connection,
        private readonly productsUnitsService: ProductsUnitsService,
        private readonly brandService: BrandService,
        private readonly categoryService: CategoryService,
        private readonly unitService: UnitsService
    ) { }

    async getProducts(options: { curPage: number; perPage: number; q: number; sort: string; group: number; }){
        try {
            let objects: [Products[], number];
            let qb = this.productsRepository.createQueryBuilder('product');
            qb = qb.where('product.delFlg = :q',{
                q: '0'
            });
            if (options.q) {
                qb = qb.andWhere('product.productCode = :q1 or LOWER(product.productName) like LOWER(:q2)', {
                    q1: `${options.q}`,
                    q2: `%${options.q}%`
                });
            }
            options.sort = options.sort && new Products().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('product.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('product.' + field, 'ASC');
                }
            }
            qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);
            // eslint-disable-next-line prefer-const
            objects = await qb.getManyAndCount();
            const resultObj = []
            const outObj = await plainToClass(ProductsDto,objects[0]);
            for (const data of outObj) {
                const obj = data;
                obj.unit = await this.productsUnitsService.findByProduct(data.productCode);
                resultObj.push(obj);
            }
            const metaPage = {
                perPage: options.perPage,
                totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
                totalResults: objects[1],
                curPage: options.curPage
            }
            return {
                data: await plainToClass(ProductsDto,resultObj),
                meta: await plainToClass(PageMetaDto,metaPage),
                brands: await this.brandService.getAllBrand(),
                categorys: await this.categoryService.getAllCategory(),
                units: await this.unitService.getSmallestUnit()
            };
        } catch (error) {
            throw error;
        }

    }
    //Update
    async update(options: { productCode: string; item: Products; }){
        try {
         const item = await this.findByproductCode({ productCode: options.productCode });  
         await this.productsRepository.update({productCode: options.productCode, delFlg: '0'},options.item);
         return  {data: plainToClass(ProductsDto,item)};
        } catch (error) {
          throw error;  
        }

    }
  //Delete
  async delete(options: { item: Products }){
    try {
        const item = await this.findByproductCode({ productCode: options.item.productCode });  
        item.delFlg = '1'
        await this.productsRepository.update({productCode: item.productCode,delFlg: '0'},item);
        return  { data: options.item };
       } catch (error) {
         throw error;  
       }

}  
    //Create
    async create(options: { item: InCreateProductsDto }) {
        try {
            await this.isExistWithproductCode({ productCode: options.item.productCode });
            await this.productsUnitsService.checkIsExistProductUnit(options.item);
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const pdata = await plainToClass(Products,options.item);
            try {
            //const product = await this.productsRepository.save(plainToClass(Products,options.item));
            const product = await queryRunner.manager.save(pdata);
            await this.productsUnitsService.saveProductUnit(product,options.item,queryRunner);

            await queryRunner.commitTransaction();
            } catch (err) {
             // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
            throw new UnprocessableEntityException(err);
             } finally {
          // you need to release a queryRunner which was manually instantiated
          await queryRunner.release();
        }
            return {data: plainToClass(ProductsDto, options.item) };

        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async isExistWithproductCode(options: { productCode: string; }) {
        let item;
        try {
            item = await this.findByproductCode({ productCode: options.productCode });
        } catch (error) {
            item = undefined;
        }
        if (item && item.productCode === options.productCode) {
            throw new ConflictException(`User with userId "${options.productCode}" is exists`);
        }
    }
    async findByproductCode(options: { productCode: string; }){
        try {
           
            const item = await this.productsRepository.findOneOrFail({
                where: {
                    productCode: options.productCode,
                    delFlg: '0'
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`User with email "${options.productCode}" not founded`);
        }
    }

}
