import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateSelfWashHallDto {
  @IsNumber()
  @IsOptional()
  locationId?: number;

  @IsBoolean()
  @IsOptional()
  isInUse?: boolean;

  @IsBoolean()
  @IsOptional()
  isOutOfService?: boolean;
}
