/* public.decorator.ts FINAL CODE */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    // add isPublic decorator logic here
    // we need guard return true when the isPublic metadata is found before continuing further
    // we need reflector (new helper class) to access routes metadata in our guards
    // reflector allows us to retrieve metadata within a specific context
    // with constructor we have now accees to the provider from canAactivate() to retrieve metadata
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // reflector needs a target object context as a 2nd parameter
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
    // guard returns true or fale depending on wether the API_KEY was provided with the request
    // return authHeader === process.env.API_KEY;
  }
}
