import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { CustomersDto } from './customers.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutCustomersPageDto {
    @Type(() => CustomersDto)
    @ApiProperty({ type: CustomersDto, isArray: true })
    data: CustomersDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
