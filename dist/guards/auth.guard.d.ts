import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    constructor(jwtService: JwtUtilService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
