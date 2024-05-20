import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import * as QRCode from 'qrcode';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    return this.carRepository.save(car);
  }

  async update(carId: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new Error('Car not found');
    }

    Object.assign(car, updateCarDto);
    return this.carRepository.save(car);
  }

  async remove(carId: number): Promise<void> {
    const result = await this.carRepository.delete(carId);
    if (result.affected === 0) {
      throw new Error('Car not found or not removed');
    }
  }

  async findCarByUser(userId: number, carId: number): Promise<Car> {
    const car = await this.carRepository.findOne({
      where: {
        id: carId,
        user: { id: userId }
      },
      relations: ['user']
    });

    if (!car) {
      throw new Error(`Car not found`);
    }

    return car;
  }

  async findAllCarsByUserId(userId: number): Promise<Car[]> {
    return await this.carRepository.find({
      where: { user: { id: userId } },
    });
  }
}
