import { Body, Controller, Post } from '@nestjs/common';
import { DistancesService } from './distances.service';
import { LocationDto } from './dto/request-distances.dto';

@Controller('distances')
export class DistancesController {
  constructor(private readonly distancesService: DistancesService) {}

  @Post()
  calculateDistances(@Body() currentLocation: LocationDto) {
    return this.distancesService.calculateDistances(currentLocation);
  }
}
