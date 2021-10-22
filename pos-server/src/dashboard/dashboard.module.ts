import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';
import { OrderModule } from 'src/order/order.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    OrderModule,
    ProductsModule

  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
