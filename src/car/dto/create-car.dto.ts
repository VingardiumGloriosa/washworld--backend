import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
