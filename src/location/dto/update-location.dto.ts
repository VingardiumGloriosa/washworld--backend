import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
    @IsOptional()
    @Type(() => Buffer)
    photo?: Buffer;
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    mapsUrl?: string;
  }
