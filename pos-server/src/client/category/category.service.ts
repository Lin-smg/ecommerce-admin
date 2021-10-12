import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Category } from 'src/category/category.entity';
import { MainCategoryService } from 'src/main-category/main-category.service';
import { Repository } from 'typeorm';
import { MainSubCategoryDto } from './dto/main-sub-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly mainCategoryService: MainCategoryService
  ) { }

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
      throw error
    }
  }

  async getByMainCategoryCode(code) {
    const category = await this.categoryRepository.find({
      where: {
        mainCategoryCode: code,
        delFlg: '0'
      }
    })

    return category
  }

  async getMainSubCategory() {
    try {
      console.log('DDDD>>>>>>>>')
      const mainCatObj = await this.mainCategoryService.getAll()
      const resultObj = []
      for (const data of mainCatObj) {
        console.log(data)
        
        const obj = {
          categoryCode: data.categoryCode,
          categoryName: data.categoryName,
          subCategoryList: null
        }
        obj.categoryCode = data.categoryCode
        obj.categoryName = data.categoryName

        obj.subCategoryList = await this.getByMainCategoryCode(data.categoryCode);
        resultObj.push(obj);
      }
      console.log('data', resultObj)
      return {
        data: plainToClass(
          MainSubCategoryDto,
          resultObj
        )
      }

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

}
