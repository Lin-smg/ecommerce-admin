import { Module } from '@nestjs/common';
import { MainCategoryService } from './main-category.service';
import { MainCategoryController } from './main-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainCategory } from './entities/main-category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MainCategory]),
    CategoryModule
  ],
  controllers: [MainCategoryController],
  providers: [MainCategoryService],
  exports: [MainCategoryService]
})
export class MainCategoryModule {}
