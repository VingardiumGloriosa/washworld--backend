import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create(createLocationDto);
    const created = await this.locationRepository.save(location);

    return created
  }

  async findAll(): Promise<ResponseLocationDto[]> {
    const locations = await this.locationRepository.find();
    return locations.map(location => this.locationToLocationDto(location));
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return location;
  }

  async update(id: number,  updateLocationDto: UpdateLocationDto): Promise<ResponseLocationDto> {
    await this.locationRepository.update(id, updateLocationDto);
    const updatedLocation = await this.locationRepository.findOneBy({ id });
    if (!updatedLocation) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return this.locationToLocationDto(updatedLocation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location #${id} not found`);
    }
  }

  private locationToLocationDto(location : Location) : ResponseLocationDto {
    if (!location) {
      throw new Error(`Location not found`);
    }

    const locationDto = new ResponseLocationDto()
    locationDto.id = location.id
    locationDto.name = location.name
    locationDto.address = location.address
    locationDto.maps_url = location.maps_url
    locationDto.washHalls = location.washHalls
    locationDto.selfWashHalls = location.selfWashHalls

    if (location.photo) {
      const photoBase64 = location.photo.toString('base64');
      locationDto.photo = `data:image/jpeg;base64,${photoBase64}`;
    } else {
      locationDto.photo = null
    }

    return locationDto;
  }
}
