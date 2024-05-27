import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ResponseWashHallsDto } from './response-wash-halls.dto';
import { ResponseSelfWashHallsDto } from './response-self-wash-halls.dto';
import { Location } from '../entities/location.entity';

export class ResponseLocationDto {

    constructor(location: Location) {
      if (!location) {
        throw new Error(`Location not found`);
      }
  
      this.id = location.id;
      this.name = location.name;
      this.address = location.address;
      this.mapsUrl = location.mapsUrl;
      this.latitude = Number(location.latitude);
      this.longitude = Number(location.longitude);
  
      const washHallsDto = new ResponseWashHallsDto();
      const availableWashHalls = location.washHalls?.filter(
        (washHall) =>
          (!washHall.finishTime || washHall.finishTime.getTime() < Date.now()) &&
          !washHall.isOutOfService,
      );
      washHallsDto.available = availableWashHalls?.length;
      washHallsDto.total = location.washHalls?.length;
      washHallsDto.outOfService = location.washHalls?.filter(
        (washHall) => washHall.isOutOfService,
      )?.length;
      washHallsDto.nextAvailable = availableWashHalls?.find(
        (washHall) => !washHall.finishTime,
      )
        ? null
        : availableWashHalls?.sort(
            (a, b) => a.finishTime.getTime() - b.finishTime.getTime(),
          )[0]?.finishTime || null;
  
      const selfWashHallsDto = new ResponseSelfWashHallsDto();
      const availableSelfWashHalls = location.selfWashHalls?.filter(
        (washHall) => !washHall.isInUse && !washHall.isOutOfService,
      );
      selfWashHallsDto.available = availableSelfWashHalls?.length;
      selfWashHallsDto.total = location.selfWashHalls?.length;
      selfWashHallsDto.outOfService = location.selfWashHalls?.filter(
        (washHall) => washHall.isOutOfService,
      )?.length;
  
      this.washHalls = washHallsDto;
      this.selfWashHalls = selfWashHallsDto;
      // this.photo = location.photo?.toString()
  
      if (location.photo) {
        this.photo = `data:image/jpeg;base64,${location.photo}`;
      } else {
        this.photo = null;
      }
    }

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
    mapsUrl: string | null;

    washHalls: ResponseWashHallsDto;

    selfWashHalls: ResponseSelfWashHallsDto;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
  }
