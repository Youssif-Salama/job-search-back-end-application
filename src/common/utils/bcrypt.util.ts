import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptUtilService {
  constructor(private envConfig: ConfigService) { }

  // Async hashing
  async bcryptHashingUtil(password: string): Promise<string> {
    const saltRounds = this.envConfig.get<number>('envConfig.bcrypt.salting') ?? 10;
    return await bcrypt.hash(password, +saltRounds);
  }

  // Async comparison
  async bcryptCompareUtil(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
