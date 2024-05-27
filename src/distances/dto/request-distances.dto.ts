import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
    @IsNumber()
    @IsOptional()
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
}
