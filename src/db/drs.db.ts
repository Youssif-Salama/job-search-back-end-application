import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/shared/entities/admins.entity";
import { AppointmentEntity } from "src/shared/entities/appointments.entity";
import { CategoryEntity } from "src/shared/entities/categoris.entity";
import { CredentialEntity } from "src/shared/entities/credentials.entity";
import { DoctorEntity } from "src/shared/entities/doctors.entity";
import { PlanEntity } from "src/shared/entities/plans.entity";
import { RateEntity } from "src/shared/entities/rates.entity";
import { RequestEntity } from "src/shared/entities/requests.entity";
import { ReservationEntity } from "src/shared/entities/reservations.entity";
import { WorkingHoursEntity } from "src/shared/entities/workinHours.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isDevelopment = process.env.NODE_ENV === 'dev';
        return {
          type: 'postgres',
          host: configService.get<string>('envConfig.db.host'),
          port: configService.get<number>('envConfig.db.port'),
          username: configService.get<string>('envConfig.db.user'),
          password: configService.get<string>('envConfig.db.pass'),
          database: configService.get<string>('envConfig.db.name'),
          entities: [AdminEntity, PlanEntity, DoctorEntity, AppointmentEntity, CategoryEntity, RateEntity, RequestEntity, ReservationEntity, WorkingHoursEntity, CredentialEntity],
          synchronize: true,
          logging: isDevelopment,
          ssl: !isDevelopment ? { rejectUnauthorized: false } : false
        };
      }
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DbModule { }