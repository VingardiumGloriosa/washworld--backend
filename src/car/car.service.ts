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
    // Generate QR Code inside the create or before saving based on license plate
    car.qrCodeUrl = await this.generateQRCode(car.licensePlate);
    return this.carRepository.save(car);
  }

  async update(carId: number, updateCarDto: UpdateCarDto): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new Error('Car not found');
    }

    Object.assign(car, updateCarDto);

    if (updateCarDto.licensePlate) {
      // Update QR code if license plate changes
      car.qrCodeUrl = await this.generateQRCode(car.licensePlate);
    }
    return this.carRepository.save(car);
  }

  async remove(carId: number): Promise<void> {
    const result = await this.carRepository.delete(carId);
    if (result.affected === 0) {
      throw new Error('Car not found or not removed');
    }
  }

  private async generateQRCode(data: string): Promise<string> {
    try {
      const url = await QRCode.toDataURL(data);
      return url;
    } catch (error) {
      throw new Error('Failed to generate QR Code');
    }
  }

  async findAllCarsByUserId(userId: number): Promise<Car[]> {
    return await this.carRepository.find({
      where: { user: { id: userId } },
    });
  }
}
