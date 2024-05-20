import { Injectable } from '@nestjs/common';
import { LocationDto } from './dto/request-distances.dto';

@Injectable()
export class DistancesService {
  calculateDistances(currentLocation: LocationDto, destinations: LocationDto[]): { id: number; distance: number }[] {
    return destinations.map(destination => {
      const distance = this.calculateDistance(currentLocation, destination);
      return { id: destination.id, distance };
    });
  }

  private calculateDistance(location1: LocationDto, location2: LocationDto): number {
    // Haversine formula to calculate the great-circle distance
    const R = 6371e3; // meters
    const lat1 = location1.latitude * Math.PI / 180;
    const lat2 = location2.latitude * Math.PI / 180;
    const deltaLat = (location2.latitude - location1.latitude) * Math.PI / 180;
    const deltaLon = (location2.longitude - location1.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }
}
