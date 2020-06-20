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
import { OutBranchPageDto } from './dto/out-branch-page.dto';
import { plainToClass } from 'class-transformer';
import { OutBranchDto } from './dto/out-branch.dto';
import { InCreateBranchDto } from './dto/in-create-branch.dto';
import { Branch } from './branch.entity';
import { BranchService } from './branch.service';

@Controller('branch')
@ApiTags('branch')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  //Create Branch
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBranchDto,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiBody({ type: InCreateBranchDto })
  @Post()
  async create(@Body() dto: InCreateBranchDto) {
    try {
      return plainToClass(
        OutBranchDto,
        await this.branchService.create({
          item: plainToClass(Branch, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  //Update Branch
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBranchDto,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'code' })
  @Put(':code')
  async update(@Param('code') code, @Body() dto: InCreateBranchDto) {
    try {
      return plainToClass(
        OutBranchDto,
        await this.branchService.update({
          code,
          item: await plainToClass(Branch, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  //Find Branch
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutBranchPageDto,
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
  async getBranch(
    @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
    @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
    @Query('q') q,
    @Query('group') group,
    @Query('sort') sort,
  ) {
    try {
      return plainToClass(
        OutBranchPageDto,
        await this.branchService.getBranch({
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
    type: OutBranchDto,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'code' })
  @Post('delete')
  async delete(@Body() dto: InCreateBranchDto) {
    try {
      return plainToClass(
        OutBranchDto,
        await this.branchService.delete({
          item: await plainToClass(Branch, dto),
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
