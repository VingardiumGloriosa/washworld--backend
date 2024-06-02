import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsOptional()
  @Type(() => Buffer)
  photo?: Buffer;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
