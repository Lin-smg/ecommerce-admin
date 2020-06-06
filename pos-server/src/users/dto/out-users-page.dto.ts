import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { UsersDto } from './users.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutUsersPageDto {
    @Type(() => UsersDto)
    @ApiProperty({ type: UsersDto, isArray: true })
    data: UsersDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
