import { Module } from '@nestjs/common';
import { WashHallService } from './wash_hall.service';
import { WashHallController } from './wash_hall.controller';

@Module({
  controllers: [WashHallController],
  providers: [WashHallService],
})
export class WashHallModule {}
