import { Module } from '@nestjs/common';
import { DistancesService } from './distances.service';
import { LocationModule } from 'src/location/location.module';

@Module({
  providers: [DistancesService],
  imports: [LocationModule]
})
export class DistancesModule {}
