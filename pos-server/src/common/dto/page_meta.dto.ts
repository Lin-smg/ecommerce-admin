import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
    @ApiProperty({ type: Number })
    perPage: number;
  
    @ApiProperty({ type: Number })
    totalPages: number;
  
    @ApiProperty({ type: Number })
    totalResults: number;
  
    @ApiProperty({ type: Number })
    curPage: number;

}
