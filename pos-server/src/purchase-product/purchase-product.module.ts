import { Module } from '@nestjs/common';
import { PurchaseProductService } from './purchase-product.service';
import { PurchaseProductController } from './purchase-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { ProductsModule } from 'src/products/products.module';
import { UnitsModule } from 'src/units/units.module';
import { CategoryModule } from 'src/category/category.module';
import { BrandModule } from 'src/brand/brand.module';
import { PurchaseItems } from './entities/purchase-item.entity';
import { ProductsPurchase } from 'src/pos/products-purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseItems,
      ProductsPurchase
    ]),
    ProductsModule,
    UnitsModule,
    CategoryModule,
    BrandModule
  ],
  controllers: [PurchaseProductController],
  providers: [PurchaseProductService]
})
export class PurchaseProductModule {}
