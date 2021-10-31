import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Customers } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersDto } from './dto/customers.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';
import { CryptoService } from 'src/users/crypto/crypto.service';
import { ShippingService } from './shipping.service';

@Injectable()
export class CustomersService {

    constructor(
        @InjectRepository(Customers)
        private readonly customersRepository: Repository<Customers>,
        private readonly cryptoService: CryptoService,
    ) { }

    async getCustomerCount() {
        return await this.customersRepository.count({ delFlg: '0' });
    }

    async isExistCustomerEmail(email: string) {
        try {
            const item = await this.customersRepository.findOne({
                where: {
                    email: email,
                    delFlg: '0'
                },
            });

            if (item) {
                return true
            } else {
                return false;
            }
        } catch (error) {

        }
    }

    async getCustomerByEmail(email: string) {
        try {
            return await this.customersRepository.findOne({
                where: {
                    email: email,
                    delFlg: '0'
                },
            });
        } catch (error) {
            throw new NotFoundException(`Customer with email "${email}" not founded`);
        }
    }

    async create(options: { item: Customers; }): Promise<any> {
        try {
            const exist = await this.isExistCustomerEmail(options.item.email)

            if (exist) {
                throw new NotAcceptableException('Customer Email is already Exists')
            }
            const password = await this.cryptoService.hash(options.item.password);
            options.item.password = password;
            options.item.createDateTime = new Date();
            options.item.role = 'customer'
            return await this.customersRepository.save(options.item);

        } catch (error) {
            if (error.code === '23505') {
                throw new NotAcceptableException('Customer Name is already exists.')
            }
            throw error;
        }
    }

    async update(options: { id: any; item: Customers; }): Promise<any> {

        try {
            const customer = await this.findById({ id: options.id });
            if (options.item.password) {
                const password = await this.cryptoService.hash(options.item.password);
                options.item.password = password;
            } else {
                options.item.password = customer.password
            }
            await this.customersRepository.update({ id: options.id }, options.item);
            return options.item
        } catch (error) {
            throw error;
        }

    }

    async delete(options: { item: Customers; }): Promise<any> {
        try {
            await this.findById({ id: options.item.id });
            const customer = await this.findById({ id: options.item.id });
            customer.delFlg = '1';
            await this.customersRepository.update({ id: customer.id }, customer);
            return options.item;
        } catch (error) {
            throw error;
        }
    }

    async findById(options: { id: any; }) {
        try {

            const item = await this.customersRepository.findOneOrFail({
                where: {
                    id: options.id
                },
            });

            return item;

        } catch (error) {
            throw new NotFoundException(`Deleted Customer is not founded`);
        }
    }

    async getAllCustomers() {

        let objects: [Customers[], number];
        let qb = this.customersRepository.createQueryBuilder('customer');
        qb = qb.where('customer.delFlg = :d', {
            d: '0',
        });
        // eslint-disable-next-line prefer-const
        objects = await qb.getManyAndCount();
        return { data: await plainToClass(CustomersDto, objects[0]) };

    }

    async getCustomers(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }) {
        try {
            let objects: [Customers[], number];
            let qb = this.customersRepository.createQueryBuilder('customer');
            qb = qb.where('customer.delFlg = :d', {
                d: '0'
            });
            if (options.q) {
                qb = qb.andWhere('LOWER(customer.name) like LOWER(:q) OR LOWER(customer.city) like LOWER(:q)', {
                    q: `%${options.q}%`,
                });
            }
            options.sort = options.sort && new Customers().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('customer.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('customer.' + field, 'ASC');
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
                data: plainToClass(CustomersDto, objects[0]),
                meta: plainToClass(PageMetaDto, metaPage)
                // data: plainToClass(CustomersDto,objects[0]),
                // meta: plainToClass(PageMetaDto,metaPage)
            };
        } catch (error) {
            throw new error;
        }

    }
}
