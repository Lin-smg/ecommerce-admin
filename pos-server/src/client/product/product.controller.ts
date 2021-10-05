import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { OutProductDto } from './dto/out-products.dto';
import { ProductsService } from 'src/products/products.service';
import { OutProductsDto } from 'src/products/dto/out-products.dto';

@Controller('clientProduct')
@ApiTags('clientProduct')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll() {
    // return plainToClass(
    //   OutProductDto,
    //   this.productService.findAll()
    // )

    return plainToClass(
      OutProductsDto,
      await this.productService.getAllProducts()
    )
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
