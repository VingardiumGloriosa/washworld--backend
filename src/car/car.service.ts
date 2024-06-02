import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseCarDto } from './dto/response-car.dto';
import { User } from '../user/entities/user.entity';
import { ImageCompressionService } from 'src/image-compression/image-compression.service';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly imageCompressionService: ImageCompressionService,
  ) {}

  async create(userId : number, createCarDto: CreateCarDto): Promise<ResponseCarDto> {
    const car = this.carRepository.create({
      ...createCarDto,
      photo: createCarDto.photo ? await this.imageCompressionService.compressImage(Buffer.from(createCarDto.photo, "base64"), 50) : null
    });
    if (!car) throw Error('Failed to create car');

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw Error('User not found');

    car.user = user;

    const savedCar = this.carRepository.save(car);

    return new ResponseCarDto(savedCar)
  }

  async update(carId: number, updateCarDto: UpdateCarDto): Promise<ResponseCarDto> {
    const car = await this.carRepository.findOne({ where: { id: carId } });
    if (!car) {
      throw new Error('Car not found');
    }

    Object.assign(car, {
      ...updateCarDto,
      photo: updateCarDto.photo ? await this.imageCompressionService.compressImage(Buffer.from(updateCarDto.photo, "base64"), 50) : null
    });
    const savedCar = this.carRepository.save(car);

    return new ResponseCarDto(savedCar)
  }

  async remove(carId: number): Promise<void> {
    const result = await this.carRepository.delete(carId);
    if (result.affected === 0) {
      throw new Error('Car not found or not removed');
    }
  }

  async findCarByUser(userId: number, carId: number): Promise<ResponseCarDto> {
    const car = await this.carRepository.findOne({
      where: {
        id: carId,
        user: { id: userId },
      },
      relations: ['user'],
    });

    return this.carToCarDto(car);
  }

  async findAllCarsByUserId(userId: number): Promise<ResponseCarDto[]> {
    const cars = await this.carRepository.find({
      where: { user: { id: userId } },
    });

    const carDtos = cars.map((car) => this.carToCarDto(car));

    return carDtos;
  }

  private carToCarDto(car: Car): ResponseCarDto {
    if (!car) {
      throw new Error(`Car not found`);
    }

    const carDto = new ResponseCarDto(car);

    if (car.photo) {
      carDto.photo = `data:image/jpeg;base64,${car.photo.toString('base64')}`;
    } else {
      car.photo = null;
    }

    return carDto;
  }
}
