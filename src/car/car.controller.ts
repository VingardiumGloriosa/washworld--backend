import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  NotFoundException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { UserId } from 'src/jwt/user-id.decorator';

@Controller('users/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllCars(@UserId() userId : number) {
    return await this.carService.findAllCarsByUserId(userId);
  }

  @Get(':carId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getCar(@UserId() userId : number, @Param('carId') carId: string) {
    return await this.carService.findCarByUser(userId, Number(carId));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async addCar(
    @UserId() userId : number,
    @Body() createCarDto: CreateCarDto,
  ) {
    try {
      return await this.carService.create(userId, createCarDto);
      
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Put(':carId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async updateCar(
    @Param('carId') carId: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    try {
      return await this.carService.update(Number(carId), updateCarDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':carId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCar(
    @Param('carId') carId: string,
  ) {
    try {
      await this.carService.remove(Number(carId));
    } catch (error) {
      throw new NotFoundException('Car not found or not removed');
    }
    return null;
  }
}
