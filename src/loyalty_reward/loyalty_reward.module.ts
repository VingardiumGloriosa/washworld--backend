import { Module } from '@nestjs/common';
import { LoyaltyRewardService } from './loyalty_reward.service';
import { LoyaltyRewardController } from './loyalty_reward.controller';

@Module({
  controllers: [LoyaltyRewardController],
  providers: [LoyaltyRewardService],
})
export class LoyaltyRewardModule {}
