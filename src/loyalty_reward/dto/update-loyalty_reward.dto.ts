import { PartialType } from '@nestjs/mapped-types';
import { CreateLoyaltyRewardDto } from './create-loyalty_reward.dto';

export class UpdateLoyaltyRewardDto extends PartialType(CreateLoyaltyRewardDto) {}
