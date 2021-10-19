'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CustomerLoginDto {
    @IsString()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;
}
