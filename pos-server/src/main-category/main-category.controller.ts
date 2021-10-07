import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { MainCategoryService } from './main-category.service';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutCategoryDto } from 'src/category/dto/out-category.dto';
import { plainToClass } from 'class-transformer';
import { OutMainCategoryDto } from './dto/out-main-category.dto';
import { MainCategory } from './entities/main-category.entity';
import { MainCategoryDto } from './dto/main-category.dto';
import { OutMainCategoryAllDto } from './dto/out-main-category-all.dto';

@Controller('main-category')
@ApiTags('main-category')
export class MainCategoryController {
  constructor(private readonly mainCategoryService: MainCategoryService) { }

  //Create 
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutCategoryDto,
    description: 'The record has been successfully created.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBody({ type: CreateMainCategoryDto })

  @Post()
  async create(@Body() dto: CreateMainCategoryDto) {
    try {
      return plainToClass(
        OutMainCategoryDto,
        await this.mainCategoryService.create({
          item: plainToClass(MainCategory, dto)
        })
      )

    } catch (error) {
      throw new error
    }
  }

  // delete
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutCategoryDto,
    description: 'The record has been successfully deleted.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'categoryCode' })
  @Delete(':categoryCode')
  async delete(@Param('categoryCode') code: string) {
    return plainToClass(
      OutMainCategoryDto,
      await this.mainCategoryService.delete(code)
    )
  }

  // update
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutCategoryDto,
    description: 'The record has been successfully updated.'
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'categoryCode' })
  @Put(':categoryCode')
  async update(@Param('categoryCode') code: string, @Body() dto: CreateMainCategoryDto) {
    try {
      return plainToClass(
        OutMainCategoryDto,
        await this.mainCategoryService.update(
          code,
          plainToClass(
            MainCategory,
            dto
          )
        )
      )

    } catch (error) {
      throw error
    }
  }

  // get
  @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutMainCategoryAllDto,
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
  async  getAllByOption(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('sort') sort
  ) {

    try {
      return plainToClass(
        OutMainCategoryAllDto,
        await this.mainCategoryService.getAllByOption(
          {
            curPage,
            perPage,
            q,
            sort,
            group
        }
        )
      )
      
    } catch (error) {
      console.error(error);
      
      throw error
    }

  }

  // @Get()
  // findAll() {
  //   return this.mainCategoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mainCategoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMainCategoryDto: UpdateMainCategoryDto) {
  //   return this.mainCategoryService.update(+id, updateMainCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mainCategoryService.remove(+id);
  // }
}
