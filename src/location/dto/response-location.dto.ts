import { IsNumber, IsString } from 'class-validator';
import { SelfWashHall } from 'src/self_wash_hall/entities/self_wash_hall.entity';
import { WashHall } from 'src/wash_hall/entities/wash_hall.entity';

export class ResponseLocationDto {

    @IsNumber()
    id: Number

    @IsString()
    photo: string | null;
  
    @IsString()
    name: string;
  
    @IsString()
    address: string;
  
    @IsString()
    maps_url: string | null;

    washHalls: WashHall[]

    selfWashHalls: SelfWashHall[]
  }
