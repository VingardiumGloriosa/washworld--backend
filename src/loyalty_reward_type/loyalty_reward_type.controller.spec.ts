import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyRewardTypeController } from './loyalty_reward_type.controller';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';

describe('LoyaltyRewardTypeController', () => {
  let controller: LoyaltyRewardTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyRewardTypeController],
      providers: [LoyaltyRewardTypeService],
    }).compile();

    controller = module.get<LoyaltyRewardTypeController>(LoyaltyRewardTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
