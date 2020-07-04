import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TproductsOrder } from './t-products-order.entity';
import { ProductsSale } from './products-sale.entity';
import { TproductsSale } from './t-products-sale.entity';
import { ProductsPurchase } from './products-purchase.entity';
import { TProductsPurchase } from './t-products-purchase.entity';
import { ProductsOrder } from './products-order.entity';
import { ProductsModule } from '../products/products.module';
import { ProductsService } from '../products/products.service';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { UnitsModule } from '../units/units.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([
    ProductsSale,
    TproductsSale,
    ProductsPurchase,
    TProductsPurchase,
    ProductsOrder,
    TproductsOrder,
  ]),
  BrandModule,
  CategoryModule,
  UnitsModule,
  ProductsModule
  ],
  controllers: [PosController],
  providers: [PosService,ProductsService],
  exports: [PosService,ProductsService]
})
export class PosModule {}
