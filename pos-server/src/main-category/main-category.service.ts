import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CategoryService } from 'src/category/category.service';
import { PageMetaDto } from 'src/common/dto/page_meta.dto';
import { Repository } from 'typeorm';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { MainCategoryDto } from './dto/main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';
import { MainCategory } from './entities/main-category.entity';

@Injectable()
export class MainCategoryService {

  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
    private readonly categoryService: CategoryService
  ) { }

  async create(options: { item: MainCategory; }): Promise<any> {
    try {
      await this.isExistMainCatergoryCode(options.item.categoryCode)
      options.item.createDateTime = new Date();
      return { data: await this.mainCategoryRepository.save(options.item) };
    }
    catch (error) {
      throw error;
    }
  }

  async isExistMainCatergoryCode(categoryCode: string) {
    try {
      const data = await this.mainCategoryRepository.findOne({ categoryCode: categoryCode, delFlg: '0' })
      if (data) {
        throw new NotAcceptableException('Category is already exists.')
      }
    } catch (error) {
      throw error;
    }

  }

  async delete(code: string) {
    try {
      const mainCategory = await this.findByCategoryCode(code);
      const category = await this.categoryService.findByMainCategoryCode({mainCategoryCode: mainCategory.categoryCode})
      if (category) {
        throw new NotAcceptableException('Category is already used.')
      }
      mainCategory.delFlg = '1'
      await this.mainCategoryRepository.update({ categoryCode: mainCategory.categoryCode }, mainCategory)
      return { data: mainCategory }

    } catch (error) {
      throw error;
    }
  }

  async update(code: string, item: MainCategory) {
    try {
      await this.mainCategoryRepository.update({ categoryCode: code }, item);
      const mainCategory = await this.findByCategoryCode(code);
      return { data: mainCategory };

    } catch (error) {
      throw error
    }

  }

  async findByCategoryCode(categoryCode: string) {
    try {

      return await this.mainCategoryRepository.findOneOrFail({
        where: {
          categoryCode: categoryCode, delFlg: '0'
        },
      });
    } catch (error) {
      throw new NotFoundException(`This Category is not found`);
    }
  }

  async getAllByOption(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }) {
    try {
      let objects: [MainCategory[], number];
      let qb = this.mainCategoryRepository.createQueryBuilder('mainCategory');

      qb = qb.where('mainCategory.delFlg = :d', {
        d: '0'
      })

      if (options.q) {
        qb = qb.andWhere('mainCategory.categoryCode like :q OR LOWER(mainCategory.categoryName) like LOWER(:q)', {
          q: `%${options.q}%`,
        });
      }
      options.sort = options.sort && new MainCategory().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('mainCategory.' + field, 'DESC');
        } else {
          qb = qb.orderBy('mainCategory.' + field, 'ASC');
        }
      }
      qb = qb.skip((options.curPage - 1) * options.perPage).take(options.perPage);

      // eslint-disable-next-line prefer-const
      objects = await qb.getManyAndCount();
      const metaPage = {
        perPage: options.perPage,
        totalPages: options.perPage > objects[1] ? 1 : Math.ceil(objects[1] / options.perPage),
        totalResults: objects[1],
        curPage: options.curPage
    }

      return {
        data: plainToClass(MainCategoryDto,objects[0]),
        meta: plainToClass(PageMetaDto,metaPage)
      }
        
    } catch (error) {
      throw error
    }
  }
}
