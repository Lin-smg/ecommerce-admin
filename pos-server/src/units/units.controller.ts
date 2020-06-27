import { Controller, UseGuards, UseInterceptors, HttpCode, HttpStatus, Get, Query, DefaultValuePipe, ParseIntPipe, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { OutUnitsPageDto } from './dto/out-units-page.dto';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsType } from '../common/constants/permissions-type';
import { plainToClass } from 'class-transformer';
import { UnitsService } from './units.service';
import { OutUnitsDto } from './dto/out-units.dto';
import { InCreateUnitsDto } from './dto/in-create-units.dto';
import { Units } from './units.entity';
import { OutUnitsListDto } from './dto/out-units-list.dto';
import { UnitsDto } from './dto/units.dto';

@Controller('units')
@ApiTags('units')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class UnitsController {

    //Servie Constructor
    constructor(
        private readonly unitsService: UnitsService,
    ) { }

     //Create Units
     @HttpCode(HttpStatus.OK)
     @ApiResponse({
         status: HttpStatus.OK,
         type: OutUnitsDto,
         description: 'The record has been successfully created.'
     })
     @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
     @ApiBody({type:InCreateUnitsDto})
     @Permissions(PermissionsType.USERS_CREATE)
     @Post()
     async create( @Body() dto: InCreateUnitsDto) {
     try {
             return plainToClass(
                 OutUnitsDto,
                 await this.unitsService.create({
                     item: plainToClass(Units, dto)
                 })
             );
         } catch (error) {
            
             throw error;
         }
     }
 
      //Create Units
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
          status: HttpStatus.OK,
          type: OutUnitsDto,
          description: 'The record has been successfully deleted.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiBody({type:InCreateUnitsDto})
      @Permissions(PermissionsType.USERS_CREATE)
      @Post("delete")
      async delete( @Body() dto: InCreateUnitsDto) {
      try {
              return plainToClass(
                  OutUnitsDto,
                  await this.unitsService.delete({
                      item: plainToClass(Units, dto)
                  })
              );
          } catch (error) {
             
              throw error;
          }
      }
  
    
      //Update Units
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
        status: HttpStatus.OK,
        type: OutUnitsDto,
        description: 'The record has been successfully updated.'
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiParam({ name: 'id'})
      @Put(':id')
      async update(@Param('id') id, @Body() dto: InCreateUnitsDto) {        
        try {
          return plainToClass(
            OutUnitsDto,
            await this.unitsService.update({
              id,
              item: await plainToClass(Units, dto)
            })
          );
        } catch (error) {
          throw error;
        }
      }


    // Units Find
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutUnitsPageDto,
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
    async getUsers(
        @Query('cur_page', new DefaultValuePipe(1), ParseIntPipe) curPage,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) perPage,
        @Query('q') q,
        @Query('group') group,
        @Query('sort') sort
    ) {
        try {
            return plainToClass(
                OutUnitsPageDto,
                await this.unitsService.getUnits({
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

      //get Parent Units
      @HttpCode(HttpStatus.OK)
      @ApiResponse({
        status: HttpStatus.OK,
        type: OutUnitsListDto,
        description: ''
      })
      @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
      @ApiParam({ name: 'id'})
      @Get(':id')
      async getParentUnitWithId(@Param('id',ParseIntPipe) id){        
        try {
          return plainToClass(
            OutUnitsListDto,
            await this.unitsService.getParentUnitWithId({id})
          );
        } catch (error) {
            console.log(error)
          throw error;
        }
      }


}
