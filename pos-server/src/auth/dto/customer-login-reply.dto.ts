'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './token-payload.dto';
import { UsersDto } from '../../users/dto/users.dto';
import { PermissionDto } from '../../permission/dto/permission.dto';
import { PermissionGroupDto } from '../../permission/dto/permission-group.dto';
import { HttpStatus } from '@nestjs/common';
import { CustomersDto } from 'src/customers/dto/customers.dto';

export class CustomerLoginRelyDto {
    @ApiProperty({ type: CustomersDto })
    customer: CustomersDto;
    @ApiProperty({ type: TokenPayloadDto })
    token: TokenPayloadDto;
   
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

    constructor(customer: CustomersDto, token: TokenPayloadDto) {
        this.customer = customer;
        this.token = token;
    }
}
