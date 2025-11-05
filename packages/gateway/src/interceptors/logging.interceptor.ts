import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Logging Interceptor - Log all requests
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('IntentRequest');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const now = Date.now();

    this.logger.log(`Incoming ${method} ${url} - Intent: ${body?.$kind || 'GET'}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const responseTime = Date.now() - now;
          this.logger.log(`Completed ${method} ${url} - ${responseTime}ms`);
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(`Failed ${method} ${url} - ${responseTime}ms - ${error.message}`);
        },
      }),
    );
  }
}

