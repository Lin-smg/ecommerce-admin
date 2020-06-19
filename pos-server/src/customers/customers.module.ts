import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customers } from './customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers]),
   
  ],

  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
