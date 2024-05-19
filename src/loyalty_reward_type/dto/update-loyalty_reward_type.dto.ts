import { PartialType } from '@nestjs/mapped-types';
import { CreateLoyaltyRewardTypeDto } from './create-loyalty_reward_type.dto';

export class UpdateLoyaltyRewardTypeDto extends PartialType(
  CreateLoyaltyRewardTypeDto,
) {}
