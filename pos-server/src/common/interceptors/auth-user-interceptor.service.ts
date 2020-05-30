import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../users/users.entity';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        const user = request.user;
        AuthService.setAuthUser(user);

        return next.handle();
    }
}
