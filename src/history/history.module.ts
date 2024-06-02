import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { HistoryController } from './history.controller';
import { LoyaltyRewardModule } from '../loyalty_reward/loyalty_reward.module';
import { LocationModule } from '../location/location.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [
    TypeOrmModule.forFeature([History]),
    LoyaltyRewardModule,
    LocationModule,
    UserModule,
  ],
  exports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
