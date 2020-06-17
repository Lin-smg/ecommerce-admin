import { ApiProperty } from '@nestjs/swagger';
import { CustomersDto } from './customers.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutCustomersDto {
    @Type(() => CustomersDto)
    @ApiProperty({ type: CustomersDto})
    data: CustomersDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
