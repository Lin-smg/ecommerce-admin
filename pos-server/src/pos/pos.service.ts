import { Injectable, UnprocessableEntityException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsPurchase } from './products-purchase.entity';
import { Repository, Connection } from 'typeorm';
import { InProductsPurchaseDto } from './dto/in-products-purchase.dto';
import { ProductsService } from '../products/products.service';
import { plainToClass } from 'class-transformer';
import { OutProductsPurchaseDto } from './dto/out-products-purchase.dto';
import { TProductsPurchaseDto } from './dto/t-products-purchase.dto';
import { TProductsPurchase } from './t-products-purchase.entity';
import { ProductsOrder } from './products-order.entity';
import { TproductsOrder } from './t-products-order.entity';
import { InProductsOrderDto } from './dto/in-products-order.dto';
import { TProductsOrderDto } from './dto/t-products-order.dto';
import { OutProductsOrderDto } from './dto/out-products-order.dto';
import { ProductsSale } from './products-sale.entity';
import { TproductsSale } from './t-products-sale.entity';
import { TProductsSaleDto } from './dto/t-products-sale.dto';
import { OutProductsSaleDto } from './dto/out-products-sale.dto';

@Injectable()
export class PosService {

    constructor(
        @InjectRepository(ProductsPurchase)
        private readonly productsPurchaseRepository: Repository<ProductsPurchase>,
        @InjectRepository(TProductsPurchase)
        private readonly tProductsPurchaseRepository: Repository<TProductsPurchase>,
        @InjectRepository(ProductsOrder)
        private readonly productsOrderRepository: Repository<ProductsOrder>,
        @InjectRepository(TproductsOrder)
        private readonly tProductsOrderRepository: Repository<TproductsOrder>,
        @InjectRepository(ProductsSale)
        private readonly productsSaleRepository: Repository<ProductsSale>,
        @InjectRepository(TproductsSale)
        private readonly tProductsSaleRepository: Repository<TproductsSale>,
        private connection: Connection,
        private readonly productsService: ProductsService,
    ) { }
    async findByCustomerId(options: { item: number; }) {
        try {
            const qb = this.productsSaleRepository.createQueryBuilder('productSale')
                .select('productSale.receiptNo',"receiptNo")
                .addSelect("SUM(productSale.creditAmount)", "sum")
                .where('productSale.delFlg = :d AND productSale.paymentStatus = :dd AND productSale.customerId = :c', {
                    d: '0',
                    dd: 'credit',
                    c: options.item
                })
                .groupBy('productSale.receiptNo')
                .orderBy('productSale.receiptNo','ASC')
            // eslint-disable-next-line prefer-const
            const result = await qb.getRawMany();

            return {
                data: result,
                code: HttpStatus.OK
            }
        } catch (error) {
            throw error;
        }

    }

    async savePayNowData(options: { item: InProductsOrderDto; }) {
        try {
            //if (options.item.receiptNo === null || options.item.receiptNo === '') {
                options.item.receiptNo = await this.createReceiptNoForSale();
            // }
            if (options.item.customerId === null) {
                options.item.customerName = 'Walk-In Customer'
            }
            const date = await this.formatDate(new Date());
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const pSale = {
                    receiptNo: options.item.receiptNo,
                    customerId: options.item.customerId,
                    customerName: options.item.customerName,
                    date: date,
                    casherName: options.item.casherName,
                    total: options.item.total,
                    subTotal: options.item.subTotal,
                    otherTotal: options.item.otherTotal,
                    totalTax: options.item.totalTax,
                    totalDiscount: options.item.totalDiscount,
                    oldCreditAmount: options.item.oldCreditAmount,
                    grandtotal: options.item.grandtotal,
                    paidAmount: options.item.paidAmount,
                    change: options.item.change,
                    creditAmount: options.item.creditAmount,
                    dueDate: new Date(options.item.dueDate),
                    status: 'open',
                    paymentType: options.item.paymentType,
                    paymentStatus: options.item.paymentStatus
                }
                if (pSale.oldCreditAmount > 0 && pSale.paidAmount > pSale.oldCreditAmount) {
                    await queryRunner.manager
                        .createQueryBuilder()
                        .update(ProductsSale)
                        .set({ paymentStatus: "paid" })
                        .where("customerId = :id AND paymentStatus = :st", { id: pSale.customerId, st: 'credit' })
                        .execute();
                }
                const pentity = await plainToClass(ProductsSale, pSale)
                const pOrderObj = await queryRunner.manager.save(pentity);
                for (const d of options.item.soldItemsList) {

                    const data = await plainToClass(TProductsSaleDto, d);
                    const product = await this.productsService.findProductByproductCode({ productCode: data.productCode });
                    if (data.childUnitId === null) {
                        product.unitCost = data.unitCost;
                        product.unitPrice = data.sellPrice;
                    }
                    product.lastChangedDateTime = new Date();
                    product.productQty = product.productQty - data.qty;
                    await this.productsService.productPurchaseDataUpdate(product);
                    data.receiptNo = pOrderObj.receiptNo;
                    await queryRunner.manager.save(plainToClass(TproductsSale, data));
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
            return { data: plainToClass(OutProductsSaleDto, options.item) };


        } catch (error) {
            throw error;
        }
    }
    async createReceiptNoForSale(){
        try {
            const date = new Date();
            const fdate = await this.formatDate(date);
            const qb = this.productsSaleRepository.createQueryBuilder('productSale')
                .select("MAX(CAST(SUBSTRING(productSale.receiptNo,12,16) AS INTEGER))", "max")
                .where('productSale.delFlg = :d AND productSale.receiptNo LIKE :dd', {
                    d: '0',
                    dd: `${fdate}-%`
                });
            // eslint-disable-next-line prefer-const
            const result = await qb.getRawOne();
            let count = 0;
            if (result.max === null) {
                count = 1;
            } else {
                count = Number(result.max) + 1
            }
            const numStr = await this.leftFillNum(count, 5)
            return fdate + '-' + numStr;
        } catch (error) {
            throw error;
        }
 
    }
    async saveOrderData(options: { item: InProductsOrderDto; }) {
        try {
            options.item.receiptNo = await this.createReceiptNo();
            if (options.item.customerId === null) {
                options.item.customerName = 'Walk-In Customer'
            }
            const date = await this.formatDate(new Date());
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const pOrder = {
                    receiptNo: options.item.receiptNo,
                    customerId: options.item.customerId,
                    customerName: options.item.customerName,
                    date: date,
                    casherName: options.item.casherName,
                    total: options.item.total,
                    subTotal: options.item.subTotal,
                    otherTotal: options.item.otherTotal,
                    totalTax: options.item.totalTax,
                    totalDiscount: options.item.totalDiscount,
                    oldCreditAmount: options.item.oldCreditAmount,
                    grandtotal: options.item.grandtotal,
                    paidAmount: options.item.paidAmount,
                    change: options.item.change,
                    creditAmount: options.item.creditAmount,
                    dueDate: new Date(options.item.dueDate),
                    status: 'open',
                    paymentType: options.item.paymentType,
                    paymentStatus: options.item.paymentStatus
                }
                const pentity = await plainToClass(ProductsOrder, pOrder)
                const pOrderObj = await queryRunner.manager.save(pentity);
                for (const d of options.item.soldItemsList) {

                    const data = await plainToClass(TProductsOrderDto, d);
                    const product = await this.productsService.findProductByproductCode({ productCode: data.productCode });
                    if (data.childUnitId === null) {
                        product.unitCost = data.unitCost;
                        product.unitPrice = data.sellPrice;
                    }
                    product.lastChangedDateTime = new Date();
                    product.productQty = product.productQty - data.qty;
                    await this.productsService.productPurchaseDataUpdate(product);
                    data.receiptNo = pOrderObj.receiptNo;
                    await queryRunner.manager.save(plainToClass(TproductsOrder, data));
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
            return { data: plainToClass(OutProductsOrderDto, options.item) };


        } catch (error) {
            throw error;
        }
    }
    async createReceiptNo() {
        try {
            const date = new Date();
            const fdate = await this.formatDate(date);
            const qb = this.productsOrderRepository.createQueryBuilder('productOrder')
                .select("MAX(CAST(SUBSTRING(productOrder.receiptNo,12,16) AS INTEGER))", "max")
                .where('productOrder.delFlg = :d AND productOrder.receiptNo LIKE :dd', {
                    d: '0',
                    dd: `${fdate}-%`
                });
            // eslint-disable-next-line prefer-const
            const result = await qb.getRawOne();
            let count = 0;
            if (result.max === null) {
                count = 1;
            } else {
                count = Number(result.max) + 1
            }
            const numStr = await this.leftFillNum(count, 5)
            return fdate + '-' + numStr;
        } catch (error) {
            throw error;
        }

    }
    async savePurchaseData(options: { item: InProductsPurchaseDto; }) {
        try {

            options.item.invoiceNo = await this.createInvoiceNo();
            if (options.item.supplierId === null) {
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
                const pPurchaseObj = await queryRunner.manager.save(plainToClass(ProductsPurchase, pPurchase));
                for (const d of options.item.purchaseItemsList) {

                    const data = await plainToClass(TProductsPurchaseDto, d);
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
                    await queryRunner.manager.save(plainToClass(TProductsPurchase, data));
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
            const fdate = await this.formatDate(date);
            const qb = this.productsPurchaseRepository.createQueryBuilder('productPurchase')
                .select("MAX(CAST(SUBSTRING(productPurchase.invoiceNo,12,16) AS INTEGER))", "max")
                .where('productPurchase.delFlg = :d AND productPurchase.invoiceNo LIKE :dd', {
                    d: '0',
                    dd: `${fdate}-%`
                });
            // eslint-disable-next-line prefer-const
            const result = await qb.getRawOne();
            let count = 0;
            if (result.max === null) {
                count = 1;
            } else {
                count = Number(result.max) + 1
            }
            const numStr = await this.leftFillNum(count, 5)
            return fdate + '-' + numStr;
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
