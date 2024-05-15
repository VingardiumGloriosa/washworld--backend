import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLoyaltyRewardDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  loyaltyRewardTypeId?: number;
}