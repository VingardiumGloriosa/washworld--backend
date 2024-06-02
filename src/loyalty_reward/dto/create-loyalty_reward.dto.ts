import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLoyaltyRewardDto {

  constructor(lr) {
    this.userId = lr.userId,
    this.loyaltyRewardTypeId = lr.loyaltyRewardTypeId
  }

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  loyaltyRewardTypeId?: number;
}
