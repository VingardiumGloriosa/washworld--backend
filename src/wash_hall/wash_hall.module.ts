// src/wash-hall/wash-hall.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashHall } from './entities/wash_hall.entity';
import { WashHallController } from './wash_hall.controller';
import { WashHallService } from './wash_hall.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([WashHall]), LocationModule],
  controllers: [WashHallController],
  providers: [WashHallService],
})
export class WashHallModule {}
