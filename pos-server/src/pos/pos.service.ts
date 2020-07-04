import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsPurchase } from './products-purchase.entity';
import { Repository, Connection} from 'typeorm';
import { InProductsPurchaseDto } from './dto/in-products-purchase.dto';
import { ProductsService } from '../products/products.service';
import { plainToClass } from 'class-transformer';
import { OutProductsPurchaseDto } from './dto/out-products-purchase.dto';
import { TProductsPurchaseDto } from './dto/t-products-purchase.dto';
import { TProductsPurchase } from './t-products-purchase.entity';

@Injectable()
export class PosService {

    constructor(
        @InjectRepository(ProductsPurchase)
        private readonly productsPurchaseRepository: Repository<ProductsPurchase>,
        @InjectRepository(TProductsPurchase)
        private readonly tProductsPurchaseRepository: Repository<TProductsPurchase>,        
        private connection: Connection,
        private readonly productsService: ProductsService,
    ) { }


    async savePurchaseData(options: { item: InProductsPurchaseDto; }) {
        try {

            options.item.invoiceNo = await this.createInvoiceNo();
            if(options.item.supplierId === null){
            options.item.supplierName = 'Unknown Supplier'
            }
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const pPurchase = {
                    invoiceNo: options.item.invoiceNo,
                    registerNo: options.item.registerNo,
                    supplierId: options.item.supplierId,
                    supplierName: options.item.supplierName,
                    date: new Date(),
                    casherName: options.item.casherName,
                    total: options.item.total,
                    status: options.item.status,
                    remark: options.item.remark         
                }      
                const pPurchaseObj = await queryRunner.manager.save(plainToClass(ProductsPurchase,pPurchase));
                    for (const d of options.item.purchaseItemsList) {
    
                        const data = await plainToClass(TProductsPurchaseDto,d);
                        console.log(data.productCode);
                        const product = await this.productsService.findProductByproductCode({ productCode: data.productCode });
                        if (data.childUnitId === null) {
                            product.unitCost = data.unitCost;
                            product.unitPrice = data.sellPrice;
                        }
                        product.expDate = new Date(data.expDate);
                        product.lastChangedDateTime = new Date();
                        product.productQty = product.productQty + data.qty;
                        if (data.promoStatus) {
                            product.productQty = product.productQty + Number(data.promoQty);
                        }
                        await this.productsService.productPurchaseDataUpdate(product);
                        data.invoiceNo = pPurchaseObj.invoiceNo;
                        await queryRunner.manager.save(plainToClass(TProductsPurchase,data));
                    }                                      

                await queryRunner.commitTransaction();
                } catch (err) {
                    // since we have errors lets rollback the changes we made
                    await queryRunner.rollbackTransaction();
                    throw new UnprocessableEntityException(err);
                } finally {
                    // you need to release a queryRunner which was manually instantiated
                    await queryRunner.release();
                }
                return { data: plainToClass(OutProductsPurchaseDto, options.item) };


            } catch (error) {
                throw error;
            }
        }
    async createInvoiceNo() {
       try {
           const date = new Date();
           const fdate= await this.formatDate(date);
           const qb = this.productsPurchaseRepository.createQueryBuilder('productPurchase')
           .select("MAX(CAST(SUBSTRING(productPurchase.invoiceNo,12,16) AS INTEGER))","max")
           .where('productPurchase.delFlg = :d AND productPurchase.invoiceNo LIKE :dd' ,{
               d: '0',
               dd: `${fdate}-%`
           });
           // eslint-disable-next-line prefer-const
           const result = await qb.getRawOne();
           let count = 0;
           if(result.max === null){
           count = 1;
           }else{
           count = Number(result.max) + 1
           }
          const numStr = await this.leftFillNum(count,5)
          return fdate+'-'+numStr;
       } catch (error) {
        throw error;   
       }
     
    }
    async leftFillNum(num, targetLength) {
        return await num.toString().padStart(targetLength, 0);
    }
    async formatDate(date) {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
   
}
