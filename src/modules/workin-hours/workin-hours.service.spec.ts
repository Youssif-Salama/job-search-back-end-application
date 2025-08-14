import { Test, TestingModule } from '@nestjs/testing';
import { WorkinHoursService } from './workin-hours.service';

describe('WorkinHoursService', () => {
  let service: WorkinHoursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkinHoursService],
    }).compile();

    service = module.get<WorkinHoursService>(WorkinHoursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
