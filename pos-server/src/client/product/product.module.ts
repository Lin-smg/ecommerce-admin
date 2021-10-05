import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/products.entity';
import { ProductsUnits } from 'src/products/products-units.entity';
import { BrandModule } from 'src/brand/brand.module';
import { CategoryModule } from 'src/category/category.module';
import { UnitsModule } from 'src/units/units.module';
import { ProductsService } from 'src/products/products.service';
import { ProductsUnitsService } from 'src/products/products-units.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products,ProductsUnits]),
    BrandModule,
    CategoryModule,
    UnitsModule,
    ProductsModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductsUnitsService],
  // imports: [ProductsModule]
  exports: [ProductService, ProductsUnitsService, TypeOrmModule]
})
export class ProductModule {}
