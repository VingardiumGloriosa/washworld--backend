import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ResponseCarDto {

  constructor(c) {
    this.id = c.id
    this.licensePlate = c.licensePlate
    if (c.photo) {
      this.photo = `data:image/jpeg;base64,${c.photo.toString('base64')}`;
    } else {
      this.photo = null;
    }
  }

  @IsNumber()
  @IsOptional()
  id: Number;

  @IsString()
  @IsOptional()
  licensePlate?: string;

  @IsString()
  @IsOptional()
  photo?: string | null = null;
}
