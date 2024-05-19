import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelfWashHall } from './entities/self_wash_hall.entity';
import { CreateSelfWashHallDto } from './dto/create-self_wash_hall.dto';
import { UpdateSelfWashHallDto } from './dto/update-self_wash_hall.dto';
import { LocationService } from '../location/location.service';

@Injectable()
export class SelfWashHallService {
  constructor(
    @InjectRepository(SelfWashHall)
    private readonly selfWashHallRepository: Repository<SelfWashHall>,
    private readonly locationService: LocationService,
  ) {}

  async create(
    createSelfWashHallDto: CreateSelfWashHallDto,
  ): Promise<SelfWashHall> {
    const location = await this.locationService.findOne(
      createSelfWashHallDto.locationId,
    );
    const selfWashHall = this.selfWashHallRepository.create({
      ...createSelfWashHallDto,
      location,
    });
    return this.selfWashHallRepository.save(selfWashHall);
  }

  async findAll(): Promise<SelfWashHall[]> {
    return this.selfWashHallRepository.find({ relations: ['location'] });
  }

  async findOne(id: number): Promise<SelfWashHall> {
    const selfWashHall = await this.selfWashHallRepository.findOne({
      where: { id },
      relations: ['location'],
    });
    if (!selfWashHall) {
      throw new NotFoundException(`SelfWashHall with ID ${id} not found`);
    }
    return selfWashHall;
  }

  async update(
    id: number,
    updateSelfWashHallDto: UpdateSelfWashHallDto,
  ): Promise<SelfWashHall> {
    await this.selfWashHallRepository.update(id, updateSelfWashHallDto);
    const updatedSelfWashHall = await this.findOne(id);
    return updatedSelfWashHall;
  }

  async remove(id: number): Promise<void> {
    const result = await this.selfWashHallRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SelfWashHall with ID ${id} not found`);
    }
  }
}
