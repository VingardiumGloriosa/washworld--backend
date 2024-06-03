import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { UserModule } from '../user/user.module';
import { ImageCompressionService } from '../image-compression/image-compression.service';

@Module({
  controllers: [CarController],

  providers: [CarService, ImageCompressionService],
  imports: [TypeOrmModule.forFeature([Car]), UserModule],
})
export class CarModule {}
