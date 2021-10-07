import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async getAll() {
    try {
      const category = await this.categoryRepository.find({
        where: {
          delFlg: '0'
        },
      });
      return {
        data: category
      }
    } catch (error) {
      throw new error;
    }
  }

  async getByCode(code: string) {
    try {
      const category = await this.categoryRepository.findOneOrFail({
        where: {
          categoryCode: code,
          delFlg: '0'
        },
      });
      return {
        data: category
      }
    } catch (error) {
      throw new error
    }
  }

}
