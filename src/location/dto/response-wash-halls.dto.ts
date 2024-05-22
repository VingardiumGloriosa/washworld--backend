import { IsDate, IsNumber } from 'class-validator';

export class ResponseWashHallsDto {
  @IsNumber()
  available: number;

  @IsNumber()
  total: number;

  @IsNumber()
  outOfService: number;

  @IsDate()
  nextAvailable: Date;
}
