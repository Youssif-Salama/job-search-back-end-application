import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'src/shared/entities/doctors.entity';
import { PlanModule } from '../plan/plan.module';
import { CredentialModule } from '../credential/credential.module';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CodeUtilService } from 'src/common/utils/code.util';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity]), PlanModule, CredentialModule],
  controllers: [DoctorController],
  providers: [DoctorService,BcryptUtilService,CodeUtilService]
})
export class DoctorModule { }
