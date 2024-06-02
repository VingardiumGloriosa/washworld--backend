import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateHistoryDto {
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsNumber()
  locationId: number;
}
