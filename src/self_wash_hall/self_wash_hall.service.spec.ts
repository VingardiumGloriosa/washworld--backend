import { Test, TestingModule } from '@nestjs/testing';
import { SelfWashHallService } from './self_wash_hall.service';

describe('SelfWashHallService', () => {
  let service: SelfWashHallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfWashHallService],
    }).compile();

    service = module.get<SelfWashHallService>(SelfWashHallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
