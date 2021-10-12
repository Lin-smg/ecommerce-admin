import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';
import { CategoryService } from 'src/category/category.service';
import { Order } from 'src/common/constants/order';
import { ProductsUnitsService } from 'src/products/products-units.service';
import { Products } from 'src/products/products.entity';
import { UnitsService } from 'src/units/units.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    private readonly productsUnitsService: ProductsUnitsService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly unitService: UnitsService
  ) { }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async getAllProducts() {
    try {
      return {
        data: await (await this.productsRepository.find({ where: { delFlg: '0' }, order: { productQty: Order.ASC } }))
      }
    } catch (error) {
      throw new error;
    }
  }

  async getProductsByCategoryCode(code: string) {
    try {
      const products = await this.productsRepository.find({
        where: {
            categoryCode: code,
            delFlg: '0'
        },
    });
      return {
        data: products
      }
    } catch (error) {
      throw new error;
    }
  }

  async getProductByProductCode(code: string) {
    try {
      const products = await this.productsRepository.find({
        where: {
            productCode: code,
            delFlg: '0'
        },
    });
      return {
        data: products
      }
    } catch (error) {
      throw new error;
    }
  }
}
