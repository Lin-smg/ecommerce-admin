import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { Brand } from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandDto } from './dto/brand.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  //Brand Create
  async create(options: { item: Brand }): Promise<any> {
    try {
      await this.isExistBrandCode(options.item.brandCode);
      options.item.createDateTime = new Date();
      return { data: await this.brandRepository.save(options.item) };
    } catch (error) {
      throw error;
    }
  }
  async isExistBrandCode(brandCode: string) {
    try {
      const data = await this.brandRepository.findOne({
        brandCode: brandCode,
        delFlg: '0',
      });
      if (data) {
        throw new NotAcceptableException('Brand is already exists.');
      }
    } catch (error) {
      throw error;
    }
  }

  // Brand Delete
  async delete(options: { item: Brand }): Promise<any> {
    try {
      const brand = await this.findByBrandCode({
        brandCode: options.item.brandCode,
      });
      brand.delFlg = '1';
      await this.brandRepository.update({ brandCode: brand.brandCode, delFlg: '0' }, brand);
      return { data: options.item };
    } catch (error) {
      throw error;
    }
  }

  //Brand Update
  async update(options: { brandCode: string; item: Brand }): Promise<any> {
    try {
      await this.findByBrandCode({ brandCode: options.brandCode });
      await this.brandRepository.update(
        { brandCode: options.brandCode, delFlg: '0' },
        options.item,
      );
      return { data: options.item };
    } catch (error) {
      throw error;
    }
  }

  async findByBrandCode(options: { brandCode: string }) {
    try {
      return await this.brandRepository.findOneOrFail({
        where: {
          brandCode: options.brandCode,
          delFlg: '0',
        },
      });
    } catch (error) {
      throw new NotFoundException(`This Brand is not found`);
    }
  }

  //Get Branch
  async getBrand(options: {
    curPage: number;
    perPage: number;
    q: string;
    sort: string;
    group: number;
  }) {
    try {
      let objects: [Brand[], number];
      let qb = this.brandRepository.createQueryBuilder('brand');
      qb = qb.where('brand.delFlg = :d', {
        d: '0',
      });
      if (options.q) {
        qb = qb.andWhere('brand.brandCode like :q OR brand.brandName like :q', {
          q: `%${options.q}%`,
        });
      }
      options.sort =
        options.sort &&
        new Brand().hasOwnProperty(options.sort.replace('-', ''))
          ? options.sort
          : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('brand.' + field, 'DESC');
        } else {
          qb = qb.orderBy('brand.' + field, 'ASC');
        }
      }
      qb = qb
        .skip((options.curPage - 1) * options.perPage)
        .take(options.perPage);

      // eslint-disable-next-line prefer-const
      objects = await qb.getManyAndCount();
      const metaPage = {
        perPage: options.perPage,
        totalPages:
          options.perPage > objects[1]
            ? 1
            : Math.ceil(objects[1] / options.perPage),
        totalResults: objects[1],
        curPage: options.curPage,
      };

      return {
        data: plainToClass(BrandDto, objects[0]),
        meta: plainToClass(PageMetaDto, metaPage),
      };
    } catch (error) {
      throw new error();
    }
  }
}
