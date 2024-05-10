import { Test, TestingModule } from '@nestjs/testing';
import { SelfWashHallController } from './self_wash_hall.controller';
import { SelfWashHallService } from './self_wash_hall.service';

describe('SelfWashHallController', () => {
  let controller: SelfWashHallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfWashHallController],
      providers: [SelfWashHallService],
    }).compile();

    controller = module.get<SelfWashHallController>(SelfWashHallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
