import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,

  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
