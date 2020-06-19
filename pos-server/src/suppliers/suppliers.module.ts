import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suppliers } from './suppliers.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Suppliers]),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService]
})
export class SuppliersModule {}
