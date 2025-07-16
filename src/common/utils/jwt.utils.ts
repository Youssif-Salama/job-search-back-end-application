import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtUtilService {
  constructor(private envConfig: ConfigService) { }

  generateToken(data: any, expiresIn?: string) {
    return jwt.sign(data, this.envConfig.get<string>('envConfig.jwt.pass'), {
      expiresIn: expiresIn || this.envConfig.get<string>('envConfig.jwt.exp'),
    });
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.envConfig.get<string>('envConfig.jwt.pass'));
  }

  decodeToken(token: string) {
    return jwt.decode(token);
  }
}
