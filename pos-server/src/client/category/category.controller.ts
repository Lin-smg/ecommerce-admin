import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MainCategoryService } from 'src/main-category/main-category.service';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { OutMainSubCategoryDto } from './dto/out-main-sub-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('client/category')
@ApiTags('clientCategory')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Get(':code')
  getCategoryByCode(@Param('code') code: string) {
    return this.categoryService.getByCode(code);
  }

  @Get()
  async getMainSubCategory() {
    // return this.categoryService.getAll();

    return plainToClass(
      OutMainSubCategoryDto,
      await this.categoryService.getMainSubCategory()
    )
  }


}
