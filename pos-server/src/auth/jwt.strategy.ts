import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy, AbstractStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from '../common/constants/jwt-condtants';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
        private readonly customerService: CustomersService
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.SECRET,
      });
      console.log('jwt')
    }

    async validate({ iat, exp, id: userId, type: type }) {
        // console.log('AAAAA', type)
        const timeDiff = exp - iat;
        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }
        
        let user = null
        if(type == 'customer') {
            user  = await this.customerService.getCustomerByEmail(userId);
        } else {
            user  = await this.usersService.findByUserId({ userid: userId });
        }

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
