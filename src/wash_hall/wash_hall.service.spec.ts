import { Test, TestingModule } from '@nestjs/testing';
import { WashHallService } from './wash_hall.service';

describe('WashHallService', () => {
  let service: WashHallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashHallService],
    }).compile();

    service = module.get<WashHallService>(WashHallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
