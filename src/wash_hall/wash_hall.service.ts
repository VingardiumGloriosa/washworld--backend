import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashHall } from './entities/wash_hall.entity';
import { CreateWashHallDto } from './dto/create-wash_hall.dto';
import { UpdateWashHallDto } from './dto/update-wash_hall.dto';
import { LocationService } from '../location/location.service';

@Injectable()
export class WashHallService {
  constructor(
    @InjectRepository(WashHall)
    private readonly washHallRepository: Repository<WashHall>,
    private readonly locationService: LocationService,
  ) {}

  async create(createWashHallDto: CreateWashHallDto): Promise<WashHall> {
    const location = await this.locationService.findOne(
      createWashHallDto.locationId,
    );
    const washHall = await this.washHallRepository.create({
      ...createWashHallDto,
      location,
    });
    return this.washHallRepository.save(washHall);
  }

  async findAll(): Promise<WashHall[]> {
    return this.washHallRepository.find({ relations: ['location'] });
  }

  async findOne(id: number): Promise<WashHall> {
    const washHall = await this.washHallRepository.findOne({
      where: { id },
      relations: ['location'],
    });
    if (!washHall) {
      throw new NotFoundException(`WashHall with ID ${id} not found`);
    }
    return washHall;
  }

  async update(
    id: number,
    updateWashHallDto: UpdateWashHallDto,
  ): Promise<WashHall> {
    await this.washHallRepository.update(id, updateWashHallDto);
    const updatedWashHall = await this.findOne(id);
    return updatedWashHall;
  }

  async remove(id: number): Promise<void> {
    const result = await this.washHallRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`WashHall with ID ${id} not found`);
    }
  }
}
