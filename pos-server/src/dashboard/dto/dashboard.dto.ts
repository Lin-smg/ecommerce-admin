import { ApiProperty } from '@nestjs/swagger';

export class DashboardDto {

    @ApiProperty({ type: Number })
    totalUserCount: number;

    @ApiProperty({ type: Number })
    totalCustomerCount: number;
    
    @ApiProperty({ type: Number })
    totalProductCount: number;
    
}
