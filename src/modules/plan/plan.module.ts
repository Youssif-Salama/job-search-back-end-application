import { Module } from '@nestjs/common';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from 'src/shared/entities/plans.entity';
import { JwtUtilService } from 'src/common/utils/jwt.utils';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  controllers: [PlanController],
  providers: [
    PlanService,
    JwtUtilService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PlanService, TypeOrmModule],
})
export class PlanModule { }
