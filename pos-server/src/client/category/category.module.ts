import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { MainCategoryModule } from 'src/main-category/main-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    MainCategoryModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class ClientCategoryModule {}
