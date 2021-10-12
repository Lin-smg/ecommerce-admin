import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ProductsService } from 'src/products/products.service';
import { Connection, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';
import { ProductOrderDto } from './dto/product-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    
    private connection: Connection,
    private readonly productsService: ProductsService
  ) { }

  async createOrder(productOrder: ProductOrderDto) {
    try {
      const date = await this.formatDate(new Date());

      productOrder.orderNo = date + "/" + new Date().getTime();

      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const orderData = {
          orderNo: productOrder.orderNo,
          customerId: productOrder.customerId,
          customerName: productOrder.customerName,
          date: date,
          total: productOrder.total,
          subTotal: productOrder.subTotal,
          otherTotal: productOrder.otherTotal,
          totalTax: productOrder.totalTax,
          totalDiscount: productOrder.totalDiscount,
          grandtotal: productOrder.grandtotal,
          dueDate: new Date(productOrder.dueDate),
          status: productOrder.status,
          paymentType: productOrder.paymentType,
          paymentStatus: productOrder.paymentStatus
        }

        const orderEntity = await plainToClass(Order, orderData);
        const savedOrder = await queryRunner.manager.save(orderEntity);

        for(const data of productOrder.orderItems) {
          const orderItem = await plainToClass(OrderItemDto,  data);
          const product = await this.productsService.findProductByproductCode({ productCode: orderItem.productCode });
          
          product.lastChangedDateTime = new Date();
          product.productQty = product.productQty - data.qty;
          await this.productsService.productPurchaseDataUpdate(product);
          orderItem.orderNo = savedOrder.orderNo
          orderItem.categoryCode = product.categoryCode;
          orderItem.categoryName = product.categoryName;
          orderItem.brandCode = product.brandCode;
          orderItem.brandName = product.brandName;
          console.log('order Item>>', savedOrder.orderNo)
          await queryRunner.manager.save(plainToClass(OrderItem,orderItem))
        }

        await queryRunner.commitTransaction();

        return {
          data: plainToClass(ProductOrderDto, savedOrder)
        }

      } catch (error) {
        await queryRunner.rollbackTransaction()
        throw new UnprocessableEntityException(error)

      } finally {
        await queryRunner.release();
      }

      return {}

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
