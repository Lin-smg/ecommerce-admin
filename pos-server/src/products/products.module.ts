import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { UnitsModule } from '../units/units.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    BrandModule,
    CategoryModule,
    UnitsModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
