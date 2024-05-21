import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ResponseCarDto {
  @IsString()
  @IsOptional()
  licensePlate?: string;

  @IsString()
  @IsOptional()
  photo: string;


}
