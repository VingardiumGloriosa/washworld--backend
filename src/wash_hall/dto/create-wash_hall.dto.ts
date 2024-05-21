import { IsBoolean, IsDate, IsNumber } from "class-validator";

export class CreateWashHallDto {

  @IsNumber()
  locationId: number;

  @IsDate()
  finishTime?: Date;

  @IsBoolean()
  isOutOfService: boolean;
}
