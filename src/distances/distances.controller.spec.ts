import { Test, TestingModule } from '@nestjs/testing';
import { DistancesController } from './distances.controller';

describe('DistancesController', () => {
  let controller: DistancesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistancesController],
    }).compile();

    controller = module.get<DistancesController>(DistancesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
