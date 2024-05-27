// ../wash-hall/wash-hall.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashHall } from './entities/wash_hall.entity';
import { WashHallController } from './wash_hall.controller';
import { WashHallService } from './wash_hall.service';
import { LocationModule } from '../location/location.module';
import { LocationService } from '../location/location.service';

@Module({
  controllers: [WashHallController],
  providers: [WashHallService, LocationService],
  imports: [TypeOrmModule.forFeature([WashHall]), LocationModule],
})
export class WashHallModule {}
