import { Module } from '@nestjs/common';
import { LoyaltyRewardService } from './loyalty_reward.service';
import { LoyaltyRewardController } from './loyalty_reward.controller';
import { Loyalty_Reward } from './entities/loyalty_reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { LoyaltyRewardType } from 'src/loyalty_reward_type/entities/loyalty_reward_type.entity';
import { UserModule } from 'src/user/user.module';
import { LoyaltyRewardTypeModule } from 'src/loyalty_reward_type/loyalty_reward_type.module';

@Module({
  controllers: [LoyaltyRewardController],
  providers: [LoyaltyRewardService],
  imports: [TypeOrmModule.forFeature([Loyalty_Reward]), UserModule, LoyaltyRewardTypeModule],
  exports: [TypeOrmModule.forFeature([Loyalty_Reward]), LoyaltyRewardService],
})
export class LoyaltyRewardModule {}
