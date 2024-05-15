import { IsBoolean } from 'class-validator';

export class UpdateLoyaltyRewardStatusDto {
  @IsBoolean()
  isActive: boolean;
}