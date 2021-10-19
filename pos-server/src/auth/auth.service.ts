import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { jwtConstants } from '../common/constants/jwt-condtants';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { UsersDto } from '../users/dto/users.dto';
import { ContextService } from '../common/providers/context.service';
import { plainToClass } from 'class-transformer';
import { CryptoService } from '../users/crypto/crypto.service';
import { CustomersService } from 'src/customers/customers.service';
import { Customers } from 'src/customers/customers.entity';
import { CustomersDto } from 'src/customers/dto/customers.dto';
import { CustomerLoginDto } from './dto/customer-login.dto';


@Injectable()
export class AuthService {
    private static _authUserKey = 'user_key';
    private static _authCustomerKey = 'customer_key';

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly cryptoService: CryptoService,
        private readonly customerService: CustomersService
    ) { }

    async createToken(user: User | UsersDto): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: parseInt(jwtConstants.EXPIRE_IN.toString()),
            accessToken: await this.jwtService.signAsync({ id: user.userid, type: 'user' }),
        });
    }

    async createCustomerToken(customer: Customers | CustomersDto): Promise<TokenPayloadDto> {
        return new TokenPayloadDto({
            expiresIn: parseInt(jwtConstants.EXPIRE_IN.toString()),
            accessToken: await this.jwtService.signAsync({id: customer.email, type: 'customer'})
        })
    }

    async validateUser(userLoginDto: UserLoginDto): Promise<User> {
        try {
            const user = await this.usersService.findByUserId({ userid: userLoginDto.userid });
            const isValid = await this.cryptoService.compare(userLoginDto.password, user.password);
            if (!isValid) {
                throw new UnauthorizedException(`Userid or Password is wrong`);                
            }
            return plainToClass(User, user);
        } catch (error) {
            throw (error);
        }

    }

    async validateCustomer(customerLoginDto: CustomerLoginDto): Promise<Customers> {
        try {
            const customer = await this.customerService.getCustomerByEmail(customerLoginDto.email);
            if (!customer) {
                throw new UnauthorizedException(`Email is not registered`);                
            }
            const isValid = await this.cryptoService.compare(customerLoginDto.password, customer.password);
            if (!isValid) {
                throw new UnauthorizedException(`Email or Password is wrong`);                
            }
            return plainToClass(Customers, customer)
        } catch (error) {
            throw (error);
        }

    }

    static setAuthUser(user: User) {
        ContextService.set(AuthService._authUserKey, user);
    }

    static setAuthCustomer(customer: Customers) {
        ContextService.set(AuthService._authCustomerKey, customer)
    }

    static getAuthUser(): User {
        return ContextService.get(AuthService._authUserKey);
    }

    static getAuthCustomer(): Customers {
        return ContextService.get(AuthService._authCustomerKey);
    }
}
