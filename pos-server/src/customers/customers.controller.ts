import { Controller, UseGuards, UseInterceptors, HttpStatus, HttpCode, Get, Query, DefaultValuePipe, ParseIntPipe, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { OutCustomersPageDto } from './dto/out-customers-page.dto';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsType } from '../common/constants/permissions-type';
import { plainToClass } from 'class-transformer';
import { CustomersService } from './customers.service';
import { OutCustomersDto } from './dto/out-customers.dto';
import { InCreateCustomersDto } from './dto/in-create-customers.dto';
import { Customers } from './customers.entity';

@Controller('customers')
@ApiTags('customers')
@UseGuards(JwtAuthGuard,PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()

export class CustomersController {

     //Servie Constructor
     constructor(private readonly customersService: CustomersService,
       
    ) { }


     //Create customer
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
         status: HttpStatus.OK,
         type: OutCustomersDto,
         description: 'The record has been successfully created.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiBody({type:InCreateCustomersDto})
     @Permissions(PermissionsType.USERS_CREATE)
     @Post()
     async create( @Body() dto: InCreateCustomersDto) {
     try {
             return plainToClass(
                 OutCustomersDto,
                 await this.customersService.create({
                     item: plainToClass(Customers, dto)
                 })
             );
         } catch (error) {
             throw error;
         }
     }

     //delete Customer
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
         status: HttpStatus.OK,
         type: OutCustomersDto,
         description: 'The record has been successfully deleted.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiBody({type:InCreateCustomersDto})
     @Permissions(PermissionsType.USERS_CREATE)
     @Post("delete")
     async delete( @Body() dto: InCreateCustomersDto) {
     try {
             return plainToClass(
                 OutCustomersDto,
                 await this.customersService.delete({
                     item: plainToClass(Customers, dto)
                 })
             );
         } catch (error) {
            
             throw error;
         }
     }
 
   

  //update  customer
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
       status: HttpStatus.OK,
       type: OutCustomersDto,
       description: 'The record has been successfully updated.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiParam({ name: 'id'})
     @Put(':id')
     async update(@Param('id')id, @Body() dto: InCreateCustomersDto) {
       
       try {
         return plainToClass(
           OutCustomersDto,
           await this.customersService.update({
             id,
             item: await plainToClass(Customers, dto)
           })
         );
       } catch (error) {
         throw error;
       }
    }
    
     // customer Find
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
         status: HttpStatus.OK,
         type: OutCustomersPageDto,
         description: ''
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiQuery({
         name: 'q',
         required: false,
         type: String,
         description: 'Text for search (default: empty)'
     })
     @ApiQuery({
         name: 'sort',
         required: false,
         type: String,
         description: 'Column name for sort (default: -id)'
     })
     @ApiQuery({
         name: 'per_page',
         required: false,
         type: Number,
         description: 'Number of results to return per page. (default: 10)'
     })
     @ApiQuery({
         name: 'cur_page',
         required: false,
         type: Number,
         description: 'A page number within the paginated result set. (default: 1)'
     })
     @ApiQuery({
         name: 'group',
         required: false,
         type: Number,
         description: 'Group id for filter data by group. (default: empty)'
     })

     @Get()
     @Permissions(PermissionsType.USERS)
     async getCustomers(
         @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
         @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
         @Query('q') q,
         @Query('group') group,
         @Query('sort') sort
     ) {
         try {
             return plainToClass(
                 OutCustomersPageDto,
                 await this.customersService.getCustomers({
                     curPage,
                     perPage,
                     q,
                     sort,
                     group
                 })
             );
         } catch (error) {
             throw error;
         }
     }
}