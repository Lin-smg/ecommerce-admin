import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductOrderDto } from './dto/product-order.dto';
import { plainToClass } from 'class-transformer';
import { OutProductOrderDto } from './dto/out-product-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { OutProductOrderAllDto } from './dto/out-product-order-all.dto';

@Controller('client/order')
@ApiTags('clientOrder')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() dto: ProductOrderDto) {
    try {
      return plainToClass(
        OutProductOrderDto,
        await this.orderService.createOrder(dto)
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

  @Get('/customer/:customerId')
  async getOrderByCustomerId(@Param('customerId') id: number) {
    try {
      return plainToClass(
        OutProductOrderAllDto,
        await this.orderService.getOrderByCustomerId(id)
      )
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  
}
