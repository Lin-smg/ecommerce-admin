import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Repository } from "typeorm";
import { ShippingDto } from "./dto/shipping.dto";
import { Shipping } from "./shippings.entity";

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(Shipping)
        private readonly shippingRepository: Repository<Shipping>
    ) { }

    async addShipping(shipping: Shipping) {
        try {

            return { data: await this.shippingRepository.save(shipping) }

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async getAllShipping() {
        try {
            let objects: [Shipping[], number];
            let qb = this.shippingRepository.createQueryBuilder('shipping');
            qb = qb.where('shipping.delFlg = :d', {
                d: '0',
            });
            // eslint-disable-next-line prefer-const
            objects = await qb.getManyAndCount();
            return { data: await plainToClass(ShippingDto, objects[0]) };

        } catch (error) {

        }
    }

    async getShippingByCustomerId(customerId: number) {
        try {
            let objects: [Shipping[], number];
            let qb = this.shippingRepository.createQueryBuilder('shipping');
            qb = qb.where('shipping.delFlg = :d and shipping.customerId = :id', {
                d: '0',
                id: customerId
            });
            // eslint-disable-next-line prefer-const
            objects = await qb.getManyAndCount();
            return { data: await plainToClass(ShippingDto, objects[0]) };

        } catch (error) {

        }
    }

    async updateShipping(id: number, item: Shipping) {
        try {      
            return await this.shippingRepository.update({id: id},item);
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async deleteShipping(id: number) {
        try {
            const shipping = await this.findById(id)

            shipping.delFlg = '1'
            await this.shippingRepository.update({id: id}, shipping);

            return { data: shipping }
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async findById(id: number) {
        try {
    
          return await this.shippingRepository.findOneOrFail({
            where: {
              id: id, delFlg: '0'
            },
          });
        } catch (error) {
          throw new NotFoundException(`This Data is not found`);
        }
      }
}