import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PurchaseProductService } from './purchase-product.service';
import { CreatePurchaseProductDto } from './dto/create-purchase-product.dto';
import { UpdatePurchaseProductDto } from './dto/update-purchase-product.dto';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { plainToClass } from 'class-transformer';
import { OutPurchaseDto } from './dto/out-purchase.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutPurchaseReportDto } from './dto/out-purchase-report.dto';
import { PurchaseReport } from './dto/purchase-report.dto';

@Controller('purchase-product')
@ApiTags('purchase-product')
export class PurchaseProductController {
  constructor(private readonly purchaseProductService: PurchaseProductService) { }

  @Post('create')
  async createPurchase(@Body() dto: CreatePurchaseDto) {
    try {
      return plainToClass(
        OutPurchaseDto,
        await this.purchaseProductService.createPurchase(dto)
      )

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutPurchaseReportDto,
    description: ''
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Text for search (default: empty)'
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Column name for sort (default: -id)'
  })
  @ApiQuery({
    name: 'per_page',
    required: false,
    type: Number,
    description: 'Number of results to return per page. (default: 10)'
  })
  @ApiQuery({
    name: 'cur_page',
    required: false,
    type: Number,
    description: 'A page number within the paginated result set. (default: 1)'
  })
  @ApiQuery({
    name: 'group',
    required: false,
    type: Number,
    description: 'Group id for filter data by group. (default: empty)'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @Get('report')
  async getPurchaseReport(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort
  ) {
    try {
      return plainToClass(
        OutPurchaseReportDto,
        await this.purchaseProductService.getPurchaseReport(curPage, perPage, q, group, sort)
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Get(':invoiceNo')
  async getPurchaseItem(@Param('invoiceNo') invoiceNo) {
    console.log('detail')
    try {
      return plainToClass(
        OutPurchaseDto,
        await this.purchaseProductService.getReportItemByInvoiceNo(invoiceNo))
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
