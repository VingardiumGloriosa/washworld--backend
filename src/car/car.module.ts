import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [TypeOrmModule.forFeature([Car])]
})
export class CarModule {}
