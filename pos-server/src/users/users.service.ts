import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './dto/users.dto';
import { plainToClass } from 'class-transformer';
import { CryptoService } from './crypto/crypto.service';
import { PageMetaDto } from '../common/dto/page_meta.dto';
import { PermissionGroupService } from '../permission/permission-group.service';
import { BranchService } from '../branch/branch.service';



@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly cryptoService: CryptoService,
        private readonly permissionGroupService: PermissionGroupService,
        private readonly branchService: BranchService,

    ) { }

    // find UserId
    async findByUserId(options: { userid: string }) {
        try {
           
            const item = await this.userRepository.findOneOrFail({
                where: {
                    userid: options.userid,
                    delFlg: '0'
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
            const user = await this.userRepository.save(options.item);
            return {data: plainToClass(UsersDto, user) };

        } catch (error) {
            throw error;
        }
    }

    //Update
    async update(options: { userid: string; item: User; }){
        try {
         const user = await this.findByUserId({ userid: options.userid });  
         if(user.password !== options.item.password ){
            const password = await this.cryptoService.hash(options.item.password);
            options.item.password = password; 
         }
         await this.userRepository.update({userid: options.userid, delFlg: '0'},options.item);
         return  {data: await this.findByUserId({ userid: options.item.userid })};
        } catch (error) {
          throw error;  
        }

    }
    //Delete
    async delete(options: { item: User }){
        try {
            const user = await this.findByUserId({ userid: options.item.userid });  
            user.delFlg = '1'
            await this.userRepository.update({userid: user.userid,delFlg: '0'},user);
            return  {data: options.item};
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
        if (userOfUserId && userOfUserId.userid === options.userid) {
            throw new ConflictException(`User with userId "${options.userid}" is exists`);
        }
    }

    async findByDeptCode(deptCode: string) {
        try {
            return await this.userRepository.findOneOrFail({
                where: {
                    department: deptCode
                },
            });       
         } catch (error) {
        return undefined;
        }
    }
    

    // Find
    async getUsers(
        options: { curPage: number; perPage: number; q?: string; group?: number; sort?: string }
    ) {
        try {
            let objects: [User[], number];
            let qb = this.userRepository.createQueryBuilder('user');
            qb = qb.where('user.delFlg = :q',{
                q: '0'
            });
            if (options.q) {
                qb = qb.andWhere('user.username like :q or user.position like :q or user.userid = :id', {
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
                meta: plainToClass(PageMetaDto,metaPage),
                permissionGroup: await this.permissionGroupService.getAllPermissionGroup(),
                allBranch: await this.branchService.getAllBranch()            
            };
        } catch (error) {
            throw error;
        }
    }
}

