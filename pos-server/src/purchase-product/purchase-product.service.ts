import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from 'src/common/dto/page_meta.dto';
import { ProductsPurchase } from 'src/pos/products-purchase.entity';
import { TProductsPurchase } from 'src/pos/t-products-purchase.entity';
import { ProductsUnitsService } from 'src/products/products-units.service';
import { ProductsService } from 'src/products/products.service';
import { Connection, Repository } from 'typeorm';
import { CreatePurchaseProductDto } from './dto/create-purchase-product.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { OutPurchaseReportDto } from './dto/out-purchase-report.dto';
import { PurchaseReport } from './dto/purchase-report.dto';
import { UpdatePurchaseProductDto } from './dto/update-purchase-product.dto';
import { PurchaseItems } from './entities/purchase-item.entity';
import { PurchaseProduct } from './entities/purchase-product.entity';

@Injectable()
export class PurchaseProductService {
  constructor(

    @InjectRepository(ProductsPurchase)
    private readonly productPurchaseRepository: Repository<ProductsPurchase>,
    @InjectRepository(PurchaseItems)
    private readonly purchaseItemRepository: Repository<PurchaseItems>,

    private connection: Connection,
    private readonly productsService: ProductsService,
    private readonly productUnitService: ProductsUnitsService
  ) { }
  async createPurchase(purchase) {
    try {
      purchase.invoiceNo = new Date().getTime();
      if (purchase.supplierId === null) {
        purchase.supplierName = 'Unknown Supplier'
      }
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const purchaseData = {
        invoiceNo: purchase.invoiceNo,
        registerNo: purchase.registerNo,
        supplierId: purchase.supplierId ? purchase.supplierId : null,
        supplierName: purchase.supplierName,
        date: new Date(),
        casherName: purchase.casherName,
        total: purchase.total,
        status: purchase.status,
        remark: purchase.remark
      }
      const savedPurchase = await queryRunner.manager.save(plainToClass(ProductsPurchase, purchaseData));
      for (const item of purchase.purchaseItemsList) {
        const productUnit = await this.productUnitService.getProductUnitById(item.chooseUnit.id)

        productUnit.unitCost = item.chooseUnit.unitCost;
        productUnit.sellPrice = item.chooseUnit.sellPrice;
        productUnit.qty = Number(productUnit.qty) + Number(item.qty)

        await this.productUnitService.updateProductUnitById(productUnit.id, productUnit)
        const data = await plainToClass(PurchaseItems, productUnit);
        data.invoiceNo = purchaseData.invoiceNo
        // console.log(savedPurchase);
        await queryRunner.manager.save(plainToClass(PurchaseItems, data));

      }

      await queryRunner.commitTransaction();
      return { data: plainToClass(CreatePurchaseDto, purchase) }

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getPurchaseReport(curPage, perPage, q, group, sort) {
    try {
      let objects: [PurchaseProduct[], number];
      let qb = this.productPurchaseRepository.createQueryBuilder('purchaseReport');
      qb = qb.where('purchaseReport.delFlg = :d', {
        d: '0'
      });
      if (q) {
        qb = qb.andWhere('purchaseReport.date = :q ', {
          q: q
        });
      }

      sort = sort && new PurchaseProduct().hasOwnProperty(sort.replace('-', '')) ? sort : '-id';
      const field = sort.replace('-', '');
      if (sort) {
        if (sort[0] === '-') {
          qb = qb.orderBy('purchaseReport.' + field, 'DESC');
        } else {
          qb = qb.orderBy('purchaseReport.' + field, 'ASC');
        }
      }
      qb = qb.skip((curPage - 1) * perPage).take(perPage);
      // eslint-disable-next-line prefer-const
      objects = await qb.getManyAndCount();
      const metaPage = {
        perPage: perPage,
        totalPages: perPage > objects[1] ? 1 : Math.ceil(objects[1] / perPage),
        totalResults: objects[1],
        curPage: curPage
      }

      return {
        data: plainToClass(PurchaseProduct, objects[0]),
        meta: plainToClass(PageMetaDto, metaPage)
      };
    } catch (error) {
      throw error
    }
  }

  async getReportItemByInvoiceNo(invoiceNo) {
    try {
      let qb = this.productPurchaseRepository.createQueryBuilder('report');
      qb = qb.where('report.delFlg = :d and report.invoiceNo = :no', {
        d: '0',
        no: invoiceNo
      })

      const report = await qb.getOne();
      console.log('report', report)
      const result = {
        ...report,
        purchaseItemsList: []
      }

      result.purchaseItemsList = await this.purchaseItemRepository.find({ where: { invoiceNo: invoiceNo } });

      return {
        data: plainToClass(PurchaseReport, result)
      }
    } catch (error) {
      
    }
  }
}
