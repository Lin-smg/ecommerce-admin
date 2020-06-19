import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { WarehouseDto } from './warehouse.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutWarehousePageDto {
    @Type(() => WarehouseDto)
    @ApiProperty({ type: WarehouseDto, isArray: true })
    data: WarehouseDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
