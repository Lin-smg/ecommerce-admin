import { Injectable, BadRequestException } from '@nestjs/common';
import { CompanyDto } from './dto/company.dto';
import { Company } from './company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { InCompanyDto } from './dto/in-company.dto';
import { plainToClass } from 'class-transformer';
import { DepartmentDto } from './dto/department.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompanyService {
    
    constructor(
        @InjectRepository(Company)
        private readonly companyReposiory: Repository<Company>,
        @InjectRepository(Department)
        private readonly departmentReposiory: Repository<Department>,
        private readonly usersService: UsersService,
    ) { }
   async create(options: { item: InCompanyDto; }){
        try { 
            const company = await this.getExistingCompany(options.item.companyCode);            
            if(company){
                await this.companyReposiory.update(plainToClass(Company,options.item),{companyCode:company.companyCode});
            }else{
                return this.companyReposiory.save(plainToClass(Company,options.item));
            }
            return company;
        } catch (error) {
            throw error;
        }
       }
       async getToDeleteDepartment(options: { old: DepartmentDto[]; new: DepartmentDto[]; }) {
        const deleteDeptCodeList = [];
        for (const old of options.old) {
            const newList = options.new;
            if(!newList.some(newList => newList.deptCode === old.deptCode)){
                if(this.findDeparmentCodeInOther(old.deptCode)){
                 throw new BadRequestException((`User can't delete "${old.deptCode}" Because another use it`))  
                }
                deleteDeptCodeList.push(old.deptCode);
            }
        }          
        return deleteDeptCodeList;
    }
    async getCompany() {
        let result;
        try {
            result = await this.companyReposiory.findOne();
            if(result){
                return {
                    data:  plainToClass(CompanyDto,result)
                }
            }else{
                return {
                    data: plainToClass(CompanyDto, ''),
                }
            }
                    } catch (error) {
            return { data: plainToClass(CompanyDto, '')}        }
    }
    async findDeparmentCodeInOther(deptCode: string) {
       if(this.usersService.findByDeptCode(deptCode)){
        return true;
       }
       return false;
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
    async getExistingDept(deptCode: string) {
        try {
            return await this.departmentReposiory.findOneOrFail({ deptCode: deptCode });
        } catch (error) {
            return undefined;
        }    
    }
}
