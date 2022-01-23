/* WrapResponseInterceptor FINAL CODE */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// new interceptor will handle all incoming requests and wrap our data for us automaticaly
// an interceptor is similar to providers is a class with the @injectable decorator
// the interceptor method should return an Observable from the RxJS library make easier to compose async or callback base code
// powerfull alternative to Promise or callbacks
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // the intercept method wraps the Request/Response stream allowing to
    // implement custom logic before and after execution of the final route
    console.log('Before...');

    return next.handle().pipe(tap((data) => console.log('After...', data)));
    // use Callhandler to invoke the route handler method within your interceptor
    return next.handle().pipe(map((data) => ({ data })));
  }
}
