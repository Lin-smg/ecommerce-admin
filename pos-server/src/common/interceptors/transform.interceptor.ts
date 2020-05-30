import { NestInterceptor, ExecutionContext, Injectable, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isObject, isArray } from 'lodash';
import { classToPlain } from 'class-transformer';


export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => (isObject(data) ? this.transformResponse(data) : data)));
  }
  transformResponse(data: any): any {
    if (isArray(data)) {
      return data.map(item => this.transformToPlain(item));
    }
    return this.transformToPlain(data);
  }
  transformToPlain(item: any) {
    return item && item.constructor !== Object
      ? classToPlain(item)
      : item;
  }
}
