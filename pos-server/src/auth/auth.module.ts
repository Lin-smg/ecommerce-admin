import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../users/crypto/crypto.module';
import { PermissionModule } from '../permission/permission.module';
import { CustomersModule } from 'src/customers/customers.module';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
    imports: [
        // forwardRef(() => UsersModule),
        PassportModule.register({ defaultStrategy: 'local' }),
        CryptoModule,
        PermissionModule,
        UsersModule,
        CustomersModule  
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule.register({ defaultStrategy: 'local' }), AuthService],
})
export class AuthModule {}
