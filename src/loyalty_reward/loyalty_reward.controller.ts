import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { LoyaltyRewardService } from './loyalty_reward.service';
import { UpdateLoyaltyRewardStatusDto } from './dto/update-loyalty_reward-status.dto';

@Controller('user/:userId/loyalty-rewards')
export class LoyaltyRewardsController {
  constructor(private readonly loyaltyRewardsService: LoyaltyRewardService) {}

  @Patch(':rewardId')
  async toggleRewardStatus(
    @Param('userId') userId: string,
    @Param('rewardId') rewardId: string,
    @Body() updateLoyaltyRewardStatusDto: UpdateLoyaltyRewardStatusDto
  ) {
    return await this.loyaltyRewardsService.toggleRewardStatus(
      Number(rewardId),
      updateLoyaltyRewardStatusDto
    );
  }
}
