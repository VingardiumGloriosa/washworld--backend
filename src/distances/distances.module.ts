import { Module } from '@nestjs/common';
import { DistancesService } from './distances.service';

@Module({
  providers: [DistancesService]
})
export class DistancesModule {}
