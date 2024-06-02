import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { LoyaltyRewardService } from './loyalty_reward.service';
import { UpdateLoyaltyRewardStatusDto } from './dto/update-loyalty_reward-status.dto';
import { JwtAuthGuard, MatchUserIdGuard } from '../jwt/jwt-auth.guard';

@Controller('users/loyalty-rewards')
export class LoyaltyRewardController {
  constructor(private readonly loyaltyRewardsService: LoyaltyRewardService) {}

  @Patch(':rewardId')
  @UseGuards(JwtAuthGuard)
  async toggleRewardStatus(
    @Param('rewardId') rewardId: string,
    @Body() updateLoyaltyRewardStatusDto: UpdateLoyaltyRewardStatusDto,
  ) {
    return await this.loyaltyRewardsService.toggleRewardStatus(
      Number(rewardId),
      updateLoyaltyRewardStatusDto,
    );
  }
}
