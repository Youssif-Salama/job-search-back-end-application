import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerGuard as BaseThrottlerGuard,
  ThrottlerLimitDetail,
  ThrottlerStorageService,
} from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends BaseThrottlerGuard {
  constructor(
    options: any,
    storageService: ThrottlerStorageService,
    reflector: Reflector,
  ) {
    super(options, storageService, reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;

    return super.canActivate(context);
  }

  protected throwThrottlingException(
    context: ExecutionContext,
    limit: ThrottlerLimitDetail,
  ): never {
    throw new HttpException(
      {
        statusCode: 429,
        message: ['Too many requests, please try again later.'],
        error: 'TooManyRequests',
      },
      429,
    );
  }
}
