import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductOrderDto } from './dto/product-order.dto';
import { plainToClass } from 'class-transformer';
import { OutProductOrderDto } from './dto/out-product-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('client/order')
@ApiTags('client-order')
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

  
}
