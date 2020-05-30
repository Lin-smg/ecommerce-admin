import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { UsersDto } from './users.dto';
import { Type } from 'class-transformer';


export class OutUsersDto {
    @Type(() => UsersDto)
    @ApiProperty({ type: UsersDto})
    data: UsersDto;
    
}
