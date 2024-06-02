import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Loyalty_Reward } from '../entities/loyalty_reward.entity';

export class ResponseLoyaltyRewardDto {
  constructor(loyaltyReward: Loyalty_Reward) {
    this.id = loyaltyReward.id;
    this.isActive = loyaltyReward.isActive;
    this.name = loyaltyReward.loyaltyRewardType?.name || 'Unknown';
  }

  @IsNumber()
  id: number;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  name: string;
}
