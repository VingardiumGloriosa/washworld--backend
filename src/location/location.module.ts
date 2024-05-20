import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [TypeOrmModule.forFeature([Location])],
  exports: [LocationService, TypeOrmModule.forFeature([Location])],
})
export class LocationModule {}
