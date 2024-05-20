import { Module } from '@nestjs/common';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';
import { LoyaltyRewardTypeController } from './loyalty_reward_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyRewardType } from './entities/loyalty_reward_type.entity';

@Module({
  controllers: [LoyaltyRewardTypeController],
  providers: [LoyaltyRewardTypeService],
  imports: [TypeOrmModule.forFeature([LoyaltyRewardType])],
  exports: [TypeOrmModule.forFeature([LoyaltyRewardType])],
})
export class LoyaltyRewardTypeModule {}
