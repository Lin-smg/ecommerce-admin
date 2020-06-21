import { ApiProperty } from '@nestjs/swagger';
import { BranchDto } from './branch.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';


export class OutCategoryPageDto {
    @Type(() => BranchDto)
    @ApiProperty({ type: BranchDto, isArray: true })
    data: BranchDto[];

    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
