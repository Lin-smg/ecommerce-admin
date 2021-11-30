import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../common/dto/page_meta.dto';
import { Type } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { PurchaseReport } from './purchase-report.dto';


export class OutPurchaseReportDto {
    @Type(() => PurchaseReport)
    @ApiProperty({ type: PurchaseReport, isArray: true })
    data: PurchaseReport[];

    @Type(() => PageMetaDto)
    @ApiProperty({ type: PageMetaDto })
    meta: PageMetaDto;
    
    @ApiProperty({ default: HttpStatus.OK })
    code:number = HttpStatus.OK;

}
