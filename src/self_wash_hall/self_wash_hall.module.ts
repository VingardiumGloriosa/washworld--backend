import { Module } from '@nestjs/common';
import { SelfWashHallService } from './self_wash_hall.service';
import { SelfWashHallController } from './self_wash_hall.controller';

@Module({
  controllers: [SelfWashHallController],
  providers: [SelfWashHallService],
})
export class SelfWashHallModule {}
