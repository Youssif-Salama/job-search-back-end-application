import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CheckAdminExistPipe } from 'src/common/pipes/check.pipes';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CustomThrottlerGuard } from 'src/common/guards/throttle.quard';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    })
  ],
  controllers: [AdminController],
  providers: [AdminService, BcryptUtilService, CheckAdminExistPipe, MailUtilService, OtpUtilService, JwtUtilService, {
    provide: APP_GUARD,
    useClass: CustomThrottlerGuard
  }]
})
export class AdminModule { }
