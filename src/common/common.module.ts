import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

// globalGuards that depend on other classes must be registered within a @ module context
@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})

// we need to register created middleware because they :
// are not specifically tied to any method
// we can't bind them in declarative way using decorators
// instea we bind them to a route path represented as a string
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('*');
    // consumer.apply(LoggingMiddleware).forRoutes('coffees');
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET });
    // consumer.apply(LoggingMiddleware).exclude().forRoutes('*');
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');
  }
}
