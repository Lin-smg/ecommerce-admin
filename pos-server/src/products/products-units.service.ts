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
                    throw new ConflictException(`This "${item.productCode}" is already exists`);
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

    async getProductUnitById(id) {
        try {
            const item = await this.productsUnitRepository.findOneOrFail({
                where: {
                    id: id,
                    delFlg: '0'
                },
            });

            return item;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateProductUnitById(id,unit) {
        try {
            await this.productsUnitRepository.update({id:id, productCode: unit.productCode,delFlg: '0'},unit)
            
        } catch (error) {
            
        }
    }

    async updateProductUnit(productCode: string, item: InCreateProductsDto, queryRunner: QueryRunner) {
        for (const obj of item.unit) {
            const data = plainToClass(ProductsUnits,obj);
            //data.activeStatus = '0';
            if(data.id === null){
            const pUnit = {
                id: null,
                productId: item.id,
                productCode: item.productCode,
                productName: item.productName,
                unitId: data.unitId,
                unitName: data.unitName,
                childUnitId: data.childUnitId,
                childUnitName: data.childUnitName,
                unitCost: 0,
                sellPrice: data.sellPrice,
            }
            await queryRunner.manager.save(plainToClass(ProductsUnits,pUnit))
            }else {
            const pUnit = {
                id: data.id,
                productId: item.id,
                productCode: item.productCode,
                productName: item.productName,
                unitId: data.unitId,
                unitName: data.unitName,
                childUnitId: data.childUnitId,
                childUnitName: data.childUnitName,
                unitCost: data.unitCost,
                sellPrice: data.sellPrice,
            }
           
            await this.productsUnitRepository.update({id:data.id, productCode: productCode,delFlg: '0'},pUnit)
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
