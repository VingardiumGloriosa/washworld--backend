import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';

describe('LoyaltyRewardTypeService', () => {
  let service: LoyaltyRewardTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltyRewardTypeService],
    }).compile();

    service = module.get<LoyaltyRewardTypeService>(LoyaltyRewardTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
