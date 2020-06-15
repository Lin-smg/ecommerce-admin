import { ApiProperty } from '@nestjs/swagger';
import { UnitsDto } from './units.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutUnitsDto {
    @Type(() => UnitsDto)
    @ApiProperty({ type: UnitsDto})
    data: UnitsDto;
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;
}
