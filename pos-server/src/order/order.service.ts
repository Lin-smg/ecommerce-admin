import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ProductOrderDto } from 'src/client/order/dto/product-order.dto';
import { PageMetaDto } from 'src/common/dto/page_meta.dto';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>
  ) { }

  async getAllOrder(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }) {
    try {
      let objects: [Order[], number];
      let qb = this.orderRepository.createQueryBuilder('order');
      qb = qb.where('order.delFlg = :d', {
        d: '0'
      })
      if (options.q) {
        qb = qb.andWhere('order.date = :q ', {
          q: options.q
        });
      }

      options.sort = options.sort && new Order().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
      const field = options.sort.replace('-', '');
      if (options.sort) {
        if (options.sort[0] === '-') {
          qb = qb.orderBy('order.' + field, 'DESC');
        } else {
          qb = qb.orderBy('order.' + field, 'ASC');
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
        data: plainToClass(ProductOrderDto, objects[0]),
        meta: plainToClass(PageMetaDto, metaPage)
      }
    } catch (error) {
      console.log(error)
      throw error;

    }
  }

  async getOrderItemsByOrderNo(orderNo) {
    try {
      let objects: [OrderItem[], number];
      let qb = this.orderItemRepository.createQueryBuilder('orderItem');
      qb = qb.where('orderItem.delFlg = :d and orderItem.orderNo = :no', {
        d: '0',
        no: orderNo
      })

      // eslint-disable-next-line prefer-const
      objects = await qb.getManyAndCount();
      return {
        data: plainToClass(OrderItemDto, objects[0]),
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async getOrderByOrderNo(orderNo) {
    try {
      let qb = this.orderRepository.createQueryBuilder('order');
      qb = qb.where('order.delFlg = :d and order.orderNo = :no', {
        d: '0',
        no: orderNo
      })

      const order = await qb.getOne();
      const result = {
        ...order,
        orderItems: []
      }

      result.orderItems = await this.orderItemRepository.find({ where: { orderNo: orderNo } });

      return {
        data: plainToClass(ProductOrderDto, result)
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async updateOrder(orderNo: string, orderDataDto: ProductOrderDto) {
    try {
      console.log('update')
      const orderData = plainToClass(ProductOrderDto, orderDataDto)
      const item = await this.orderRepository.preload({ orderNo: orderNo, delFlg: '0', ...orderData });
      if (item) {
        return this.orderRepository.save(item);
      } else {
        throw new NotFoundException(`Order ${orderNo} not found`)
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteOrder(orderNo: string) {
    try {
      const item = await this.findOrderByOrderNo(orderNo)
      item.delFlg = '1'
      return await this.orderRepository.update({ orderNo: orderNo }, item)
    } catch (error) {
      throw error
    }
  }

  async findOrderByOrderNo(orderNo) {
    try {

      const item = await this.orderRepository.findOneOrFail({
        where: {
          orderNo: orderNo,
          delFlg: '0'
        },
      });

      return item;

    } catch (error) {
      throw new NotFoundException(`This "${orderNo}"is not founded`);
    }
  }

  async getOrderCount() {
    return await this.orderRepository.count({delFlg: '0'})
 }


}
