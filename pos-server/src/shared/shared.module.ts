import { Global, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ValidatorService } from './services/validator.service';
import { jwtConstants } from '../common/constants/jwt-condtants';
import { SharedController } from './shared.controller';


const providers = [    
    ValidatorService,   
];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        JwtModule.registerAsync({
            imports: [SharedModule],        
            useFactory: () => ({
                secretOrPrivateKey: jwtConstants.SECRET.toString(),
                // if you want to use token with expiration date
                // signOptions: {
                //     expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
                // },
            }),   
        }),
    ],
    exports: [...providers, HttpModule, JwtModule],
    controllers: [SharedController],
})
export class SharedModule {}
