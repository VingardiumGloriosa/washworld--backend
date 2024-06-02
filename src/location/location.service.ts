import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ResponseLocationDto } from './dto/response-location.dto';
import { ImageCompressionService } from 'src/image-compression/image-compression.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    private readonly imageCompressionService: ImageCompressionService,
  ) {}    


  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepository.create({
      ...createLocationDto,
      photo: createLocationDto.photo ? await this.imageCompressionService.compressImage(Buffer.from(createLocationDto.photo, "base64"), 50) : null
  });
    const created = await this.locationRepository.save(location);

    return created;
  }

  async findAll(): Promise<ResponseLocationDto[]> {
    const locations = await this.locationRepository.find({
      relations: ['washHalls', 'selfWashHalls'],
    });
    return locations.map((location) => new ResponseLocationDto(location));
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return location;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<ResponseLocationDto> {
    await this.locationRepository.update(id, {
      ...updateLocationDto,
      photo: updateLocationDto.photo ? await this.imageCompressionService.compressImage(Buffer.from(updateLocationDto.photo, "base64"), 50) : null
    });
    const updatedLocation = await this.locationRepository.findOneBy({ id });
    if (!updatedLocation) {
      throw new NotFoundException(`Location #${id} not found`);
    }
    return new ResponseLocationDto(updatedLocation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.locationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Location #${id} not found`);
    }
  }
}
