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
import { JwtAuthGuard, MatchUserIdGuard } from '@src/jwt/jwt-auth.guard';

@Controller('users/:userId/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @UseGuards(MatchUserIdGuard)
  @HttpCode(HttpStatus.OK)
  async getAllCars(@Param('userId') userId: string) {
    return await this.carService.findAllCarsByUserId(Number(userId));
  }

  @Get(':carId')
  @UseGuards(MatchUserIdGuard)
  @HttpCode(HttpStatus.OK)
  async getCar(@Param('userId') userId: string, @Param('carId') carId: string) {
    return await this.carService.findCarByUser(Number(userId), Number(carId));
  }

  @Post()
  @UseGuards(MatchUserIdGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async addCar(
    @Param('userId') userId: string,
    @Body() createCarDto: CreateCarDto,
  ) {
    try {
      return await this.carService.create(Number(userId), createCarDto);
      
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Put(':carId')
  @UseGuards(MatchUserIdGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async updateCar(
    @Param('userId') userId: string,
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
  @UseGuards(MatchUserIdGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCar(
    @Param('userId') userId: string,
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
