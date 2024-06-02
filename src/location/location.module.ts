import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { ImageCompressionService } from '../image-compression/image-compression.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, ImageCompressionService],
  imports: [TypeOrmModule.forFeature([Location])],
  exports: [LocationService, TypeOrmModule.forFeature([Location]), ImageCompressionService],
})
export class LocationModule {}
