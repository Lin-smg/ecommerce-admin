import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { BrandModule } from 'src/brand/brand.module';
import { ProductsModule } from 'src/products/products.module';
import { UnitsModule } from 'src/units/units.module';
import { CategoryModule } from 'src/category/category.module';
import { OrderItem } from './entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,OrderItem
    ]),
    ProductsModule,
    BrandModule,
    CategoryModule,
    UnitsModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
