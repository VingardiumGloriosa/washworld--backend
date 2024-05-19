import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCarDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  @IsOptional()
  licensePlate?: string;
}
