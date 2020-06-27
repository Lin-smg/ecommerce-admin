import {
  Controller,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { OutBrandPageDto } from './dto/out-brand-page.dto';
import { plainToClass } from 'class-transformer';
import { OutBrandDto } from './dto/out-brand.dto';
import { InCreateBrandDto } from './dto/in-create-brand.dto';
import { Brand } from './brand.entity';
import { BrandService } from './brand.service';
import { OutBranchDto } from 'src/branch/dto/out-branch.dto';

@Controller('brand')
@ApiTags('brand')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  //Create Brand
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBrandDto,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBody({ type: InCreateBrandDto })
  @Post()
  async create(@Body() dto: InCreateBrandDto) {
    try {
      return plainToClass(
        OutBrandDto,
        await this.brandService.create({
          item: plainToClass(Brand, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  //Update Brand
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBrandDto,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'brandCode' })
  @Put(':brandCode')
  async update(@Param('brandCode') brandCode, @Body() dto: InCreateBrandDto) {
    try {
      return plainToClass(
        OutBrandDto,
        await this.brandService.update({
          brandCode,
          item: await plainToClass(Brand, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  //Find Brand
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBrandPageDto,
    description: '',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiQuery({
    name: 'q',
    required: false,
    type: String,
    description: 'Text for search (default: empty)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Column name for sort (default: -id)',
  })
  @ApiQuery({
    name: 'per_page',
    required: false,
    type: Number,
    description: 'Number of results to return per page. (default: 10)',
  })
  @ApiQuery({
    name: 'cur_page',
    required: false,
    type: Number,
    description: 'A page number within the paginated result set. (default: 1)',
  })
  @ApiQuery({
    name: 'group',
    required: false,
    type: Number,
    description: 'Group id for filter data by group. (default: empty)',
  })
  @Get()
  async getBrand(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort,
  ) {
    try {
      return plainToClass(
        OutBrandPageDto,
        await this.brandService.getBrand({
          curPage,
          perPage,
          q,
          sort,
          group,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  //Delete Branch
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBrandDto,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'brandCode' })
  @Post('delete')
  async delete(@Body() dto: InCreateBrandDto) {
    try {
      return plainToClass(
        OutBrandDto,
        await this.brandService.delete({
          item: await plainToClass(Brand, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
