import { ApiProperty } from '@nestjs/swagger';
import { WarehouseDto } from './warehouse.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutWarehouseDto {
    @Type(() => WarehouseDto)
    @ApiProperty({ type: WarehouseDto})
    data: WarehouseDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
