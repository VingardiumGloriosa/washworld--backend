import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DistancesService } from './distances.service';
import { LocationDto } from './dto/request-distances.dto';
import { MatchUserIdGuard } from '../jwt/jwt-auth.guard';

@Controller('distances')
export class DistancesController {
  constructor(private readonly distancesService: DistancesService) {}

  @Post()
  calculateDistances(@Body() currentLocation: LocationDto) {
    return this.distancesService.calculateDistances(currentLocation);
  }
}
