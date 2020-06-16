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
            const departmentList = options.item.departments;
            const oldDepartmentList = options.item.olddepartments;
            const companyDto = plainToClass(CompanyDto,options.item);
            const toDeleteDept = await this.getToDeleteDepartment({old: oldDepartmentList,new: departmentList})       
            
            const company = await this.getExistingCompany(companyDto.companyCode);
            
            if(company){
                await this.companyReposiory.update(plainToClass(Company,companyDto),{companyCode:company.companyCode});
            }else{
                await this.companyReposiory.save(plainToClass(Company,companyDto));
            }
            
            for (const data of departmentList) {
                if(!toDeleteDept.includes(data.deptCode)){
                    const departmentDto = plainToClass(DepartmentDto,data);
                    departmentDto.companyCode = company.companyCode;
                    if(this.getExistingDept(departmentDto.deptCode)){
                        await this.departmentReposiory.update(plainToClass(Department,departmentDto),{deptCode:departmentDto.deptCode})   
                    }else{
                        await this.departmentReposiory.save(plainToClass(Department,departmentDto));
                    }
                   
                }
            }


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
