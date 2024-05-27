import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { LoyaltyRewardService } from './loyalty_reward.service';
import { UpdateLoyaltyRewardStatusDto } from './dto/update-loyalty_reward-status.dto';
import { MatchUserIdGuard } from '@src/jwt/jwt-auth.guard';

@Controller('users/:userId/loyalty-rewards')
export class LoyaltyRewardController {
  constructor(private readonly loyaltyRewardsService: LoyaltyRewardService) {}

  @Patch(':rewardId')
  @UseGuards(MatchUserIdGuard)
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
