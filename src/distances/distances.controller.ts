import { Body, Controller, Post } from '@nestjs/common';
import { CalculateDistancesDto } from './dto/request-distances.dto';
import { DistancesService } from './distances.service';

@Controller('distances')
export class DistancesController {
  constructor(private readonly distancesService: DistancesService) {}

  @Post()
  calculateDistances(@Body() calculateDistancesDto: CalculateDistancesDto) {
    const { currentLocation } = calculateDistancesDto;
    return this.distancesService.calculateDistances(currentLocation);
  }
}
