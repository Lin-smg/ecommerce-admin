import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy, AbstractStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { jwtConstants } from '../common/constants/jwt-condtants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtConstants.SECRET,
      });
    }

    async validate({ iat, exp, id: userId }) {
        const timeDiff = exp - iat;
        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }
        const user  = await this.usersService.findByUserId({ userid: userId });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
