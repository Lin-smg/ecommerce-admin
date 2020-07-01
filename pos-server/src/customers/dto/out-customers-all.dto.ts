import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { CustomersDto } from './customers.dto';


export class OutCustomersAllDto {
    @Type(() => CustomersDto)
    @ApiProperty({ type: CustomersDto, isArray: true})
    data: CustomersDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
