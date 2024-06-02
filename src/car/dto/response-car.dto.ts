import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ResponseCarDto {
  @IsNumber()
  @IsOptional()
  id: Number;

  @IsString()
  @IsOptional()
  licensePlate?: string;

  @IsString()
  @IsOptional()
  photo?: string | null = null;
}
