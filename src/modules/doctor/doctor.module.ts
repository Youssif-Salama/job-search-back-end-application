import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { PlanModule } from '../plan/plan.module';
import { CredentialModule } from '../credential/credential.module';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CodeUtilService } from 'src/common/utils/code.util';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { MailUtilService } from 'src/common/utils/mail.util';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';
import { WorkingHoursEntity } from 'src/shared/entities/workinHours.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity,WorkingHoursEntity]), PlanModule, CredentialModule, CategoryModule],
  controllers: [DoctorController],
  providers: [DoctorService, BcryptUtilService, CodeUtilService, JwtUtilService, OtpUtilService, MailUtilService, BcryptUtilService],
})
export class DoctorModule { }
