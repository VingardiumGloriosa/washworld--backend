import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { NotFoundException } from '@nestjs/common';

describe('CarController', () => {
  let controller: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const mockCarService = {
      findAllCarsByUserId: jest.fn(),
      findCarByUser: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: mockCarService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<CarController>(CarController);
    carService = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCars', () => {
    it('should return an array of cars', async () => {
      const userId = 1;
      const result = [
        { id: 1, licensePlate: 'ABC123', photo: null, user: { id: userId } },
      ];
      jest.spyOn(carService, 'findAllCarsByUserId').mockResolvedValue(result);

      expect(await controller.getAllCars(userId)).toBe(result);
      expect(carService.findAllCarsByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('getCar', () => {
    it('should return a single car', async () => {
      const userId = 1;
      const carId = '1';
      const result = {
        id: 1,
        licensePlate: 'ABC123',
        photo: null,
        user: { id: userId },
      };
      jest.spyOn(carService, 'findCarByUser').mockResolvedValue(result);

      expect(await controller.getCar(userId, carId)).toBe(result);
      expect(carService.findCarByUser).toHaveBeenCalledWith(
        userId,
        Number(carId),
      );
    });
  });

  describe('addCar', () => {
    it('should add a new car', async () => {
      const userId = 1;
      const createCarDto: CreateCarDto = { licensePlate: 'ABC123', photo: '' };
      const result = { id: 1, ...createCarDto, user: { id: userId } };
      jest.spyOn(carService, 'create').mockResolvedValue(result);

      expect(await controller.addCar(userId, createCarDto)).toBe(result);
      expect(carService.create).toHaveBeenCalledWith(userId, createCarDto);
    });
  });

  describe('updateCar', () => {
    it('should update an existing car', async () => {
      const carId = '1';
      const updateCarDto: UpdateCarDto = { licensePlate: 'DEF456', photo: '' };
      const result = { id: 1, ...updateCarDto, user: { id: 1 } };
      jest.spyOn(carService, 'update').mockResolvedValue(result);

      expect(await controller.updateCar(carId, updateCarDto)).toBe(result);
      expect(carService.update).toHaveBeenCalledWith(
        Number(carId),
        updateCarDto,
      );
    });

    it('should throw NotFoundException if car not found', async () => {
      const carId = '1';
      const updateCarDto: UpdateCarDto = { licensePlate: 'DEF456', photo: '' };
      jest
        .spyOn(carService, 'update')
        .mockRejectedValue(new Error('Car not found'));

      await expect(controller.updateCar(carId, updateCarDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteCar', () => {
    it('should delete an existing car', async () => {
      const carId = '1';
      jest.spyOn(carService, 'remove').mockResolvedValue(undefined);

      expect(await controller.deleteCar(carId)).toBeNull();
      expect(carService.remove).toHaveBeenCalledWith(Number(carId));
    });

    it('should throw NotFoundException if car not found', async () => {
      const carId = '1';
      jest
        .spyOn(carService, 'remove')
        .mockRejectedValue(new Error('Car not found'));

      await expect(controller.deleteCar(carId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
