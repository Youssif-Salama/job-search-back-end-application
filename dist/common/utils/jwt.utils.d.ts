import { ConfigService } from '@nestjs/config';
export declare class JwtUtilService {
    private envConfig;
    constructor(envConfig: ConfigService);
    generateToken(data: any, expiresIn?: string): any;
    verifyToken(token: string): any;
    decodeToken(token: string): any;
}
