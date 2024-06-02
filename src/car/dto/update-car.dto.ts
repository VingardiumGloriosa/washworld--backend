import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsOptional()
  licensePlate?: string;
}
