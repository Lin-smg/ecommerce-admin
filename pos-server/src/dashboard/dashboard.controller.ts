import { Controller, HttpCode, HttpStatus, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthUser } from '../common/decorators/auth-user.decorator';
import { User } from '../users/users.entity';
import { OutDashboardDto } from './dto/out-dashboard.dto';
import { plainToClass } from 'class-transformer';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { AuthUserInterceptor } from '../common/interceptors/auth-user-interceptor.service';
import { Permissions } from '../common/decorators/permissions.decorator';
import { PermissionsType } from '../common/constants/permissions-type';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('dashboard')
@ApiTags('dashboard')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseInterceptors(AuthUserInterceptor)
@ApiBearerAuth()
export class DashboardController {

    constructor(
        private readonly dashboardService: DashboardService
    ) { }


    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        type: OutDashboardDto,
        description: ''
    })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
    @Get()
    @Permissions(PermissionsType.DASHBORD)
    async getDashboardData(
        @AuthUser() user: User
    ) {
        try {
            return plainToClass(OutDashboardDto, 
              await this.dashboardService.getDashBoardData(user));
        } catch (error) {
            throw error;
        }

    }
}
