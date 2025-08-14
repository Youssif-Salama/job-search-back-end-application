import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { MailUtilService } from 'src/common/utils/mail.util';
import { OtpUtilService } from 'src/common/utils/otp.util';
import { CategoryEntity } from 'src/shared/entities/categoris.entity';
import { CategoryService } from '../category/category.service';
import { LocationService } from '../location/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity, DoctorEntity, CategoryEntity])],
  providers: [CommonService, MailUtilService, OtpUtilService,CategoryService,LocationService],
  controllers: [CommonController]
})
export class CommonModule { }
