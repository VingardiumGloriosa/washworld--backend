import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateSelfWashHallDto {
  @IsNumber()
  locationId: number;

  @IsBoolean()
  isInUse?: boolean;

  @IsBoolean()
  isOutOfService: boolean;
}
