import { Test, TestingModule } from '@nestjs/testing';
import { WashHallController } from './wash_hall.controller';
import { WashHallService } from './wash_hall.service';

describe('WashHallController', () => {
  let controller: WashHallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashHallController],
      providers: [WashHallService],
    }).compile();

    controller = module.get<WashHallController>(WashHallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
