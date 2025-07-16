import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard as BaseThrottlerGuard, ThrottlerLimitDetail, ThrottlerStorageService } from '@nestjs/throttler';
export declare class CustomThrottlerGuard extends BaseThrottlerGuard {
    constructor(options: any, storageService: ThrottlerStorageService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    protected throwThrottlingException(context: ExecutionContext, limit: ThrottlerLimitDetail): never;
}
