import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { UnitsModule } from '../units/units.module';
import { ProductsUnits } from './products-units.entity';
import { ProductsUnitsService } from './products-units.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products,ProductsUnits]),
    BrandModule,
    CategoryModule,
    UnitsModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsUnitsService],
  exports: [ProductsService, ProductsUnitsService, TypeOrmModule]
})
export class ProductsModule {}
