import { IsBoolean, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateWashHallDto {
  @IsNumber()
  @IsOptional()
  locationId?: number;

  @IsDate()
  @IsOptional()
  finishTime?: Date;

  @IsBoolean()
  @IsOptional()
  isOutOfService?: boolean;
}
