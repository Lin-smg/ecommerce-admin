import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { OutProductOrderAllDto } from './dto/out-product-order-all.dto';
import { OutDailySalePageDto } from 'src/pos/dto/out-daily-sale-page.dto';
import { OutOrderItemDto } from './dto/out-order-item.dto';
import { OutProductOrderDto } from './dto/out-product-order.dto';
import { ProductOrderDto } from './dto/product-order.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutDailySalePageDto,
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

  @Get()
  async getAllOrder(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort) {
    try {
      return plainToClass(
        OutProductOrderAllDto,
        await this.orderService.getAllOrder({
          curPage,
          perPage,
          q,
          sort,
          group
        })
      )

    } catch (error) {
      console.log(error)
      throw error
    }

  }

  @Get('orderItem/:orderNo')
  async getOrderItemByOrderNo(@Param('orderNo') orderNo: string) {
    try {
      return plainToClass(
        OutOrderItemDto,
        await this.orderService.getOrderItemsByOrderNo(orderNo)
      )
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Get(':orderNo')
  async getOrderByOrderNo(@Param('orderNo') orderNo: string) {
    try {
      return plainToClass(
        OutProductOrderDto,
        await this.orderService.getOrderByOrderNo(orderNo)
      )
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  @Put(':orderNo')
  async updateOrder(@Param('orderNo') orderNo: string, @Body() orderData: ProductOrderDto) {
    try {
      return plainToClass(
        OutProductOrderDto,
        await this.orderService.updateOrder(orderNo, orderData)
      )     
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Delete(':orderNo')
  async deleteOrder(@Param('orderNo') orderNo: string) {
    try {
      return await this.orderService.deleteOrder(orderNo)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

}
