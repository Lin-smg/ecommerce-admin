import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiResponse, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OutCompanyDto } from './dto/out-company.dto';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { InCompanyDto } from './dto/in-company.dto';

@Controller('company')
@ApiTags('company')
@UseGuards(JwtAuthGuard,PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CompanyController {
    constructor(private readonly companyService:CompanyService){}

    //Create Permission Group
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutCompanyDto,
        description: 'The record has been successfully created.'
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @ApiBody({type:InCompanyDto})
    //@Permissions(PermissionsType.USERS_CREATE)
    @Post()
    async create( @Body() dto: InCompanyDto) {
    try {
            return plainToClass(
                OutCompanyDto,
                await this.companyService.create({
                    item: dto
                })
            );
        } catch (error) {
            throw error;
        }
    }

}
