import { Module } from '@nestjs/common';
import { WorkinHoursService } from './workin-hours.service';
import { WorkinHoursController } from './workin-hours.controller';

@Module({
  providers: [WorkinHoursService],
  controllers: [WorkinHoursController]
})
export class WorkinHoursModule {}
