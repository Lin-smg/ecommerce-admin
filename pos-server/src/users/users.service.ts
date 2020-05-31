import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users.dto';
import { plainToClass } from 'class-transformer';
import { CryptoService } from './crypto/crypto.service';
import { PageMetaDto } from '../common/dto/page_meta.dto';



@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        public readonly userRepository: Repository<User>,
        private readonly cryptoService: CryptoService,
    ) { }

    // find UserId
    async findByUserId(options: { userid: string }) {
        try {
           
            const item = await this.userRepository.findOneOrFail({
                where: {
                    userid: options.userid
                },
            });

            return item;
    
        } catch (error) {
            throw new NotFoundException(`User with email "${options.userid}" not founded`);
        }
    }

    //Create
    async create(options: { item: User }) {
        try {
            await this.isExistWithUserId({ userid: options.item.userid });

            const password = await this.cryptoService.hash(options.item.password);
            options.item.password = password;
            options.item = await this.userRepository.save(options.item);
            const user= await this.findByUserId({ userid: options.item.userid });
            return user;

        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }

    //Update
    async update(options: { userid: string; item: User; }){
        try {
         await this.findByUserId({ userid: options.userid });  
         await this.userRepository.update({userid: options.userid},options.item);
         return  await this.findByUserId({ userid: options.item.userid });
        } catch (error) {
          throw error;  
        }

    }

    async isExistWithUserId(options: { userid: string; }) {
        let userOfUserId;
        try {
            userOfUserId = await this.findByUserId({ userid: options.userid });
        } catch (error) {
            userOfUserId = undefined;
        }
        if (userOfUserId && userOfUserId.user.userid === options.userid) {
            throw new ConflictException(`User with userId "${options.userid}" is exists`);
        }
    }


    // Find
    async getUsers(
        options: { curPage: number; perPage: number; q?: string; group?: number; sort?: string }
    ) {
        try {
            let objects: [User[], number];
            let qb = this.userRepository.createQueryBuilder('user');
            if (options.q) {
                qb = qb.where('user.username like :q or user.position like :q or user.userid = :id', {
                    q: `%${options.q}%`,
                    id: +options.q
                });
            }
            options.sort = options.sort && new User().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
            const field = options.sort.replace('-', '');
            if (options.sort) {
                if (options.sort[0] === '-') {
                    qb = qb.orderBy('user.' + field, 'DESC');
                } else {
                    qb = qb.orderBy('user.' + field, 'ASC');
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
                data: plainToClass(UsersDto,objects[0]),
                meta: plainToClass(PageMetaDto,metaPage)
            };
        } catch (error) {
            throw error;
        }
    }
}

