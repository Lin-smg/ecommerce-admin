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
import { Order } from '../common/constants/order';

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

    async productPurchaseDataUpdate(product: Products) {
        try {
            await this.productsRepository.update({productCode: product.productCode,delFlg: '0'},product);
        } catch (error) {
           throw error; 
        }
    }
    async getProductsWithSupplier(supplierId: any){
        try {
            return {
                data : await (await this.productsRepository.find({ where: {delFlg: '0',supplierId: supplierId }, order: {productQty: Order.ASC}}))
            } 
         } catch (error) {
          throw new error;   
         }
    }
    async getAllProducts(){
        try {
           return {
               data : await (await this.productsRepository.find({ where: {delFlg: '0'}, order: {productQty: Order.ASC}}))
           } 
        } catch (error) {
         throw new error;   
        }
    }
        
    async getPOSProducts(options: { product: string; supplier: string; category: string; }){
        try {
            let objects: [Products[], number];
            let qb = this.productsRepository.createQueryBuilder('product');
            qb = qb.where('product.delFlg = :q',{
                q: '0'
            });
            if (options.product && options.product !== '') {
                qb = qb.andWhere('LOWER(product.productName) like LOWER(:q1)', {
                    q1: `%${options.product}%`
                });
            }
            if (options.supplier && options.supplier !== '') {
                qb = qb.andWhere('LOWER(product.supplierName) like LOWER(:s1)', {
                    s1: `${options.supplier}`
                });
            }
            if (options.category && options.category !== '') {
                qb = qb.andWhere('LOWER(product.categoryName) like LOWER(:c1)', {
                    c1: `${options.category}`
                });
            }
            qb = qb.orderBy('product.productQty', 'DESC');
            qb = qb.take(15);
            // eslint-disable-next-line prefer-const
            objects = await qb.getManyAndCount();
            const resultObj = []
            const outObj = await plainToClass(ProductsDto,objects[0]);
            for (const data of outObj) {
                const obj = data;
                obj.unit = await this.productsUnitsService.findByProduct(data.productCode);
                resultObj.push(obj);
            }
            return {
                data: await plainToClass(ProductsDto,resultObj)
            };
        } catch (error) {
            throw error;
        }

    }
    async getProducts(options: { curPage: number; perPage: number; q: number; sort: string; group: number; }){
        try {
            let objects: [Products[], number];
            let qb = this.productsRepository.createQueryBuilder('product');
            qb = qb.where('product.delFlg = :q',{
                q: '0'
            });
            if (options.q) {
                qb = qb.andWhere('product.productCode = :q1 or LOWER(product.productName) like LOWER(:q2) or LOWER(product.supplierName) like LOWER(:q3)', {
                    q1: `${options.q}`,
                    q2: `%${options.q}%`,
                    q3: `%${options.q}%`
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
            console.log(error)
            throw error;
        }

    }
    //Update
    async update(options: { productCode: string;item: InCreateProductsDto; }){
        try {
            await this.findByproductCode({ productCode: options.item.productCode });
            if(options.item.supplierName !== ''){
            //await this.isExistProductWithSupplier(options.item);
            }
            //await this.productsUnitsService.checkIsExistProductUnit(options.item);
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const toEntity = {
                    id: options.item.id,
                    productCode: options.item.productCode,
                    productName: options.item.productName,
                    categoryCode: options.item.categoryCode,
                    categoryName: options.item.categoryName,
                    brandCode: options.item.brandCode,
                    brandName: options.item.brandName,
                    supplierId: options.item.supplierId,
                    supplierName: options.item.supplierName,
                    unitId: options.item.unitId,
                    unitName: options.item.unitName,
                    unitPrice: options.item.unit[0].sellPrice,
                    unitCost: options.item.unit[0].unitCost,
                    expDate: new Date(options.item.expDate),
                    taxPercent: options.item.taxPercent,
                    reOrder: options.item.reOrder,
                    description: options.item.description,
                    type: options.item.type,
                    packageSize: options.item.packageSize,
                    productQty: options.item.productQty,
                    imgPath: options.item.imgPath
            }
            const pdata = await plainToClass(Products,toEntity);
            try {
            //pdata.unitPrice = options.item.unit[0].sellPrice;
            //await queryRunner.manager.createQueryBuilder
            await this.productsRepository.update({productCode: options.item.productCode,delFlg: '0'},pdata);
            //await queryRunner.manager.update(Products,{productCode: pdata.productCode},pdata);
            await this.productsUnitsService.updateProductUnit(options.item.productCode,options.item,queryRunner);

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
  //Delete
  async delete(options: { item: Products }){
    try {
        const item = await this.findByproductCode({ productCode: options.item.productCode });  
        item.delFlg = '1'
        await this.productsRepository.update({productCode: item.productCode,delFlg: '0'},item);
        await this.productsUnitsService.deleteByProductCode({ productCode: options.item.productCode });
        return  { data: options.item };
       } catch (error) {
         throw error;  
       }

}  
    //Create
    async create(options: { item: InCreateProductsDto }) {
        try {
            await this.isExistWithproductCode({ productCode: options.item.productCode });
            if(options.item.supplierName !== ''){
            await this.isExistProductWithSupplier(options.item);
            }
            await this.productsUnitsService.checkIsExistProductUnit(options.item);
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const pdata = await plainToClass(Products,options.item);
            try {
            //const product = await this.productsRepository.save(plainToClass(Products,options.item));
            pdata.unitPrice = options.item.unit[0].sellPrice;
            pdata.expDate = new Date(pdata.expDate);
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
    async isExistProductWithSupplier(data: InCreateProductsDto) {
        let item;
        try {
            item = await this.productsRepository.findOneOrFail({ productCode: data.productCode, supplierId: data.supplierId, delFlg: '0' });
        } catch (error) {
            item = undefined;
        }
        if (item) {
            throw new ConflictException(`This "${data.supplierName}'s "${data.productName}" is already exists`);
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
            throw new ConflictException(`This "${options.productCode}" is already exists`);
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
            throw new NotFoundException(`This "${options.productCode}"is not founded`);
        }
    }
    async findProductByproductCode(options: { productCode: string; }) {
        try {
           
            const item = await this.productsRepository.findOneOrFail({
                where: {
                    productCode: options.productCode,
                    delFlg: '0'
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`This "${options.productCode}"is not founded`);
        }
    }

    async getProductCount() {
        return await this.productsRepository.count({ delFlg: '0' })
      }

}
