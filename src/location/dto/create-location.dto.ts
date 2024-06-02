import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  mapsUrl: string;
}
