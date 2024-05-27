import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
    @IsNumber()
    @IsOptional()
    id: number; 

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}