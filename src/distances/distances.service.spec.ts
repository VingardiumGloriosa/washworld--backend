import { Test, TestingModule } from '@nestjs/testing';
import { DistancesService } from './distances.service';

describe('DistancesService', () => {
  let service: DistancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistancesService],
    }).compile();

    service = module.get<DistancesService>(DistancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
