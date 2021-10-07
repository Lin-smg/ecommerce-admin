import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('client/category')
@ApiTags('clientCategory')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Get()
  getAllCategory() {
    return this.categoryService.getAll();
  }

  @Get(':code')
  getCategoryByCode(@Param('code') code: string) {
    return this.categoryService.getByCode(code);
  }


}
