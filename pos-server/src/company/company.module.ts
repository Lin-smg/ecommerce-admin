import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { Department } from './department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company,Department]),
    UsersModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule {}
