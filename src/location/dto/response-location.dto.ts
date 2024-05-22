import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SelfWashHall } from '../../self_wash_hall/entities/self_wash_hall.entity';
import { WashHall } from '../../wash_hall/entities/wash_hall.entity';
import { ResponseWashHallsDto } from './response-wash-halls.dto';
import { ResponseSelfWashHallsDto } from './response-self-wash-halls.dto';

export class ResponseLocationDto {

    @IsNumber()
    id: Number

    @IsOptional()
    @IsString()
    photo?: string | null = null;
  
    @IsString()
    name: string;
  
    @IsString()
    address: string;
  
    @IsString()
    maps_url: string | null;

    washHalls: ResponseWashHallsDto

    selfWashHalls: ResponseSelfWashHallsDto
  }
