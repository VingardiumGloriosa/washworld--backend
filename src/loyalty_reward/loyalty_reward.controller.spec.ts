import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyRewardController } from './loyalty_reward.controller';
import { LoyaltyRewardService } from './loyalty_reward.service';

describe('LoyaltyRewardController', () => {
  let controller: LoyaltyRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyRewardController],
      providers: [LoyaltyRewardService],
    }).compile();

    controller = module.get<LoyaltyRewardController>(LoyaltyRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
