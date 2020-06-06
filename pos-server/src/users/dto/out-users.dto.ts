import { ApiProperty } from '@nestjs/swagger';
import { UsersDto } from './users.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutUsersDto {
    @Type(() => UsersDto)
    @ApiProperty({ type: UsersDto})
    data: UsersDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
