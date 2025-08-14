import { Test, TestingModule } from '@nestjs/testing';
import { WorkinHoursController } from './workin-hours.controller';

describe('WorkinHoursController', () => {
  let controller: WorkinHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkinHoursController],
    }).compile();

    controller = module.get<WorkinHoursController>(WorkinHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
