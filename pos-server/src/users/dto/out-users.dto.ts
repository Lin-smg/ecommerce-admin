import { ApiProperty } from '@nestjs/swagger';
import { UsersDto } from './users.dto';
import { Type } from 'class-transformer';


export class OutUsersDto {
    @Type(() => UsersDto)
    @ApiProperty({ type: UsersDto})
    data: UsersDto;
    
}
