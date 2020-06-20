import { Controller, UseGuards, UseInterceptors, HttpCode, HttpStatus, Get, Query, DefaultValuePipe, ParseIntPipe, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { OutCategoryPageDto } from './dto/out-categroy-page.dto';
import { plainToClass } from 'class-transformer';
import { OutCategoryDto } from './dto/out-category.dto';
import { InCreateCategoryDto } from './dto/in-create-category.dto';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('category')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class CategoryController {

    //Servie Constructor
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

     //Create Category
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
         status: HttpStatus.OK,
         type: OutCategoryDto,
         description: 'The record has been successfully created.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiBody({type:InCreateCategoryDto})
    // @Permissions(PermissionsType.USERS_CREATE)
     @Post()
     async create( @Body() dto: InCreateCategoryDto) {
     try {
             return plainToClass(
                OutCategoryDto,
                 await this.categoryService.create({
                     item: plainToClass(Category, dto)
                 })
             );
         } catch (error) {
            
             throw error;
         }
     } 
      //Create Category
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
          status: HttpStatus.OK,
          type: OutCategoryDto,
          description: 'The record has been successfully deleted.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiParam({ name: 'categoryCode'})      
     //@Permissions(PermissionsType.USERS_CREATE)
      @Post("delete")
      async delete( @Body() dto: InCreateCategoryDto) {
        try {
            return plainToClass(
              OutCategoryDto,
              await this.categoryService.delete({
                item: await plainToClass(Category, dto)
              })
            );
                
            } catch (error) {
               
                throw error;
            }
        }
      //Update Category
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
        status: HttpStatus.OK,
        type: OutCategoryDto,
        description: 'The record has been successfully updated.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiParam({ name: 'categoryCode'})
      @Put(':categoryCode')
      async update(@Param('categoryCode') categoryCode, @Body() dto: InCreateCategoryDto) {        
        try {
          return plainToClass(
            OutCategoryDto,
            await this.categoryService.update({
                categoryCode,
              item: await plainToClass(Category, dto)
            })
          );
        } catch (error) {
          throw error;
        }
      }
    //Find Category
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutCategoryPageDto,
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
    //@Permissions(PermissionsType.USERS)
    async getCategory(
        @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutCategoryPageDto,
                await this.categoryService.getCategory({
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
