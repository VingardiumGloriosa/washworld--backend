import { Module } from '@nestjs/common';
import { DistancesService } from './distances.service';
import { LocationModule } from '../location/location.module';
import { DistancesController } from './distances.controller';

@Module({
  controllers: [DistancesController],
  providers: [DistancesService],
  imports: [LocationModule],
})
export class DistancesModule {}
