import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { DashboardDto } from './dashboard.dto';
import { Type } from 'class-transformer';

export class OutDashboardDto {

    
    @Type(() => DashboardDto)
    @ApiProperty({ type: DashboardDto })
    data: DashboardDto;

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

   
}
