import { ApiProperty } from '@nestjs/swagger';

import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { BranchDto } from './branch.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutBranchPageDto {
    @Type(() => BranchDto)
    @ApiProperty({ type: BranchDto, isArray: true })
    data: BranchDto[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
