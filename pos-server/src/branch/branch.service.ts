import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { Branch } from './branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchDto } from './dto/branch.dto';
import { plainToClass } from 'class-transformer';
import { PageMetaDto } from '../common/dto/page_meta.dto';

@Injectable()
export class BranchService {
 
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
  ) {}

  //Branch Create
  async create(options: { item: Branch }): Promise<any> {
    try {
      await this.isExistBranchCode(options.item.code);
      options.item.createDateTime = new Date();
      return { data: await this.branchRepository.save(options.item) };
    } catch (error) {
      throw error;
    }
  }
  async isExistBranchCode(code: string) {
    try {
      const data = await this.branchRepository.findOne({
        code: code,
        delFlg: '0',
      });
      if (data) {
        throw new NotAcceptableException('Branch is already exists.');
      }
    } catch (error) {
      throw error;
    }
  }

  // Branch Delete
  async delete(options: { item: Branch }): Promise<any> {
    try {
      const branch = await this.findByBranchCode({ code: options.item.code });
      branch.delFlg = '1';
      await this.branchRepository.update({ code: branch.code, delFlg: '0' }, branch);
      return { data: options.item };
    } catch (error) {
      throw error;
    }
  }

  //Branch Update
  async update(options: { code: string; item: Branch }): Promise<any> {
    try {
      await this.findByBranchCode({ code: options.code });
      await this.branchRepository.update({ code: options.code, delFlg: '0' }, options.item);
      return { data: options.item };
    } catch (error) {
      throw error;
    }
  }

  async findByBranchCode(options: { code: string }) {
    try {
      return await this.branchRepository.findOneOrFail({
        where: {
          code: options.code,
          delFlg: '0',
        },
      });
    } catch (error) {
      throw new NotFoundException(`This Branch is not found`);
    }
  }

  //Get Branch
  async getBranch(options: { curPage: number; perPage: number; q: string; sort: string; group: number; }){
      try {
       let objects: [Branch[], number];
       let qb = this.branchRepository.createQueryBuilder('branch');
       qb = qb.where('branch.delFlg = :d',{
           d: '0'
       });
       if (options.q) {
           qb = qb.andWhere('branch.code like :q OR category.name like :q', {
               q: `%${options.q}%`,
           });
       }
       options.sort = options.sort && new Branch().hasOwnProperty(options.sort.replace('-', '')) ? options.sort : '-id';
       const field = options.sort.replace('-', '');
       if (options.sort) {
           if (options.sort[0] === '-') {
               qb = qb.orderBy('branch.' + field, 'DESC');
           } else {
               qb = qb.orderBy('branch.' + field, 'ASC');
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
           data: plainToClass(BranchDto,objects[0]),
           meta: plainToClass(PageMetaDto,metaPage)
       };
      } catch (error) {
          throw new error;
      }
   }

   async getAllBranch() {
    try {
      return await plainToClass(BranchDto, await this.branchRepository.find({delFlg: '0'}));
  } catch (error) {
      throw (error)
  }
  }
}
