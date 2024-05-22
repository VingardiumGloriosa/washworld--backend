import { IsDate, IsNumber } from 'class-validator';

export class ResponseSelfWashHallsDto {
  @IsNumber()
  available: number;

  @IsNumber()
  total: number;

  @IsNumber()
  outOfService: number;
}
