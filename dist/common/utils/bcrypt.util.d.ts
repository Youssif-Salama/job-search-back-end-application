import { ConfigService } from '@nestjs/config';
export declare class BcryptUtilService {
    private envConfig;
    constructor(envConfig: ConfigService);
    bcryptHashingUtil(password: string): Promise<string>;
    bcryptCompareUtil(password: string, hashedPassword: string): Promise<boolean>;
}
