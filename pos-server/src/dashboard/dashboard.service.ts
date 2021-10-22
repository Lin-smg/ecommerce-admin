import { Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CustomersService } from '../customers/customers.service';
import { plainToClass } from 'class-transformer';
import { DashboardDto } from './dto/dashboard.dto';
import { OrderService } from 'src/order/order.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class DashboardService {
    constructor(
        private readonly userService: UsersService,
        private readonly customerService: CustomersService,
        private readonly orderService: OrderService,
        private readonly productService: ProductsService
    ){}

    async getDashBoardData(user: User) {
       console.log(user);
       try {
        const custcount: number = await this.customerService.getCustomerCount();
        const usrcount: number = await this.userService.getUserCount();
        const prodcount: number = await this.productService.getProductCount();
        const orderCount: number = await this.orderService.getOrderCount();
       
        const dashboardData = {
            totalUserCount: usrcount,
            totalCustomerCount: custcount,
            totalProductCount: prodcount,
            totalOrderCount: orderCount
        }
        console.log(plainToClass(DashboardDto,dashboardData)
        )
        return {
            data: plainToClass(DashboardDto, dashboardData)
        };
    
    } catch (error) {
           throw error;
       }
    }
}
