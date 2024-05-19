export class CreateWashHallDto {
  readonly locationId: number;
  readonly finish_time?: Date;
  readonly is_out_of_service: boolean;
}
