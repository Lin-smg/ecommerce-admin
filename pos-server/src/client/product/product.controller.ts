import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { OutProductDto } from './dto/out-products.dto';
import { ProductsService } from 'src/products/products.service';
import { OutProductsDto } from 'src/products/dto/out-products.dto';

@Controller('client/product')
@ApiTags('clientProduct')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly productsService: ProductsService) {}


  @Get()
  async findAll() {
    return plainToClass(
      OutProductsDto,
      await this.productService.getAllProducts()
    )
  }

  @Get(':categoryCode')
  async getProductByCategoryCode(@Param('categoryCode') code: string) {
    return plainToClass(
      OutProductDto,
      await this.productService.getProductsByCategoryCode(code)
    )
  }

  @Get('detail/:productCode')
  async getProductByProductCode(@Param('productCode') code: string) {
    return plainToClass(
      OutProductDto,
      await this.productService.getProductByProductCode(code)
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }


}
