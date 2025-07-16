import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptUtilService {
  constructor(private envConfig: ConfigService) {}

  // bcrypt method
  bcryptHashingUtil(password: string): string {
    const saltRounds =
      this.envConfig.get<number>('envConfig.bcrypt.salting') ?? 10;
    return bcrypt.hashSync(password, +saltRounds);
  }

  // bcrypt compare method
  bcryptCompareUtil(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
