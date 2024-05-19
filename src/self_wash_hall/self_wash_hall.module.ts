// src/self-wash-hall/self-wash-hall.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelfWashHall } from './entities/self_wash_hall.entity';
import { SelfWashHallController } from './self_wash_hall.controller';
import { SelfWashHallService } from './self_wash_hall.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([SelfWashHall]), LocationModule],
  controllers: [SelfWashHallController],
  providers: [SelfWashHallService],
})
export class SelfWashHallModule {}
