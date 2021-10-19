import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customers } from './customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PermissionModule } from 'src/permission/permission.module';
import { CryptoModule } from 'src/users/crypto/crypto.module';
import { Shipping } from './shippings.entity';
import { ShippingService } from './shipping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers, Shipping]),
    UsersModule,
    CryptoModule,
    ],

  controllers: [CustomersController],
  providers: [CustomersService, ShippingService],
  exports: [CustomersService]
})
export class CustomersModule {}
