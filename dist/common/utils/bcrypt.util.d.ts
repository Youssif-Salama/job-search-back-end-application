import { ConfigService } from '@nestjs/config';
export declare class BcryptUtilService {
    private envConfig;
    constructor(envConfig: ConfigService);
    bcryptHashingUtil(password: string): string;
    bcryptCompareUtil(password: string, hash: string): boolean;
}
