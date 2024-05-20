import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
    @IsNumber()
    readonly id: number; 

    @IsNumber()
    readonly latitude: number;

    @IsNumber()
    readonly longitude: number;
}

export class CalculateDistancesDto {
    @ValidateNested()
    @Type(() => LocationDto)
    currentLocation: LocationDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LocationDto)
    destinationLocations: LocationDto[];
}
