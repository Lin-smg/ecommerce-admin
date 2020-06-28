import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository, QueryRunner, Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InCreateProductsDto } from './dto/in-create-products.dto';
import { ProductsUnits } from './products-units.entity';
import { ProductsUnitsDto } from './dto/products-units.dto';

@Injectable()
export class ProductsUnitsService {
    
    
    constructor(
        @InjectRepository(ProductsUnits)
        private readonly productsUnitRepository: Repository<ProductsUnits>,
        private connection: Connection,
        ) { }
   
    // async getProductUnitWithId(options: { id: number; productCode: string; }){
    //     try {
    //         const productUnit = this.productsUnitRepository.createQueryBuilder('punit')
            
            
    //         return {data: plainToClass(ProductsUnits, productUnit) };
    //     } catch (error) {
    //         console.log(error)
    //         throw error;
    //     }
    // }
    async checkIsExistProductUnit(item: InCreateProductsDto) {
        try {
            for (const obj of item.unit) {
                const data = await this.productsUnitRepository.find({productCode: item.productCode,unitId: obj.id , delFlg: '0'})
                if(data){
                    throw new ConflictException(`User with userId "${item.productCode}" is exists`);
                }
            }
        } catch (error) {
            
        }
    }

    async saveProductUnit(product: Products, item: InCreateProductsDto, queryrunner: QueryRunner) {
        for (const obj of item.unit) {
            const data = plainToClass(ProductsUnits,obj);
            data.productId = product.id;
            data.productCode = product.productCode
            data.productName = product.productName;
            data.unitId = obj.id;
            data.id = null;
            //data.activeStatus = '0';
            //await this.productsRepository.save(data)
            await queryrunner.manager.save(data)
        }
    }

    async updateProductUnit(productCode: string, item: InCreateProductsDto, queryRunner: QueryRunner) {
        for (const obj of item.unit) {
            const data = plainToClass(ProductsUnits,obj);
            //data.activeStatus = '0';
            if(data.productCode === ''){
            data.productId = item.id;
            data.productCode = item.productCode
            data.productName = item.productName;
            data.unitId = obj.id;
            data.id = null;
            await queryRunner.manager.save(data)
            }else {
            await this.productsUnitRepository.update({id:data.id, productCode: productCode,delFlg: '0'},data)
            }
            //data.activeStatus = '0';
            //await this.productsRepository.save(data)
            
        }
    }

    async findByProduct(productCode: string){
        let objects: [ProductsUnits[], number];
        let qb = this.productsUnitRepository.createQueryBuilder('productUnit');
        qb = qb.where('productUnit.delFlg = :d AND productUnit.productCode = :i' ,{
            d: '0',
            i: productCode
        });
        // eslint-disable-next-line prefer-const
        objects = await qb.getManyAndCount();
        return await plainToClass(ProductsUnitsDto, objects[0]);
    }

    async deleteByProductCode(options: { productCode: string; }) {
        await this.productsUnitRepository.createQueryBuilder('productUnit')
        .update(ProductsUnits).set({delFlg: '1'}).where('productUnit.productCode=:code',{code: options.productCode}).execute()
    }
   
}
