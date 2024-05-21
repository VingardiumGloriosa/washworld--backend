import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @Type(() => Buffer)
  photo?: Buffer;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
