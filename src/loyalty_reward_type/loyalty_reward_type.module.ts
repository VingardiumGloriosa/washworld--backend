import { Module } from '@nestjs/common';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';
import { LoyaltyRewardTypeController } from './loyalty_reward_type.controller';

@Module({
  controllers: [LoyaltyRewardTypeController],
  providers: [LoyaltyRewardTypeService],
})
export class LoyaltyRewardTypeModule {}
