import { Injectable } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { InCompanyDto } from './dto/in-company.dto';
import { plainToClass } from 'class-transformer';
import { DepartmentDto } from './dto/department.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyReposiory: Repository<Company>,
        @InjectRepository(Department)
        private readonly departmentReposiory: Repository<Department>,
    ) { }
   async create(options: { item: InCompanyDto; }){
        try {
            const departmentList = options.item.department;
            const oldDepartmentList = options.item.olddepartment;
            const companyDto = plainToClass(CompanyDto,options.item);
            const company = await this.getExistingCompany(companyDto.companyCode);
            if(company){
                await this.companyReposiory.update(plainToClass(Company,companyDto),{companyCode:company.companyCode});
            }else{
                await this.companyReposiory.save(plainToClass(Company,companyDto));
            }
           const toDeleteDept = await this.getToDeleteDept({old: oldDepartmentList,new: departmentList})
           for (let department of toDeleteDept){
               if(await )
           }
            for (const i in departmentList) {
               const departmentDto = plainToClass(DepartmentDto,departmentList[i]);
               departmentDto.companyCode = options.item.companyCode;
               await this.departmentReposiory.save(plainToClass(Department,departmentDto))
            }


        } catch (error) {
            throw error;
        }
       }
    async getExistingCompany(companyCode: string) {
        let result;
        try {
            result = await this.companyReposiory.findOneOrFail({ companyCode: companyCode });
        } catch (error) {
            result = undefined;
        }    
    
    return result;
    }
}
