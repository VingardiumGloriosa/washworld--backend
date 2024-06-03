import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { User } from '../user/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ImageCompressionService } from '../image-compression/image-compression.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

describe('CarService', () => {
  let service: CarService;
  let carRepository: Repository<Car>;
  let userRepository: Repository<User>;
  let imageCompressionService: ImageCompressionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: getRepositoryToken(Car),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: ImageCompressionService,
          useValue: {
            compressImage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    carRepository = module.get<Repository<Car>>(getRepositoryToken(Car));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    imageCompressionService = module.get<ImageCompressionService>(
      ImageCompressionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new car', async () => {
      const userId = 1;
      const createCarDto: CreateCarDto = { licensePlate: 'ABC123', photo: '' };
      const user = new User();
      user.id = userId;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(carRepository, 'create').mockReturnValue(new Car());

      const result = await service.create(userId, createCarDto);

      expect(result).toEqual({
        id: 1,
        licensePlate: 'ABC123',
        photo: null,
        user,
      });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(carRepository.create).toHaveBeenCalledWith({
        ...createCarDto,
        photo: null,
      });
      expect(carRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if user is not found', async () => {
      const userId = 1;
      const createCarDto: CreateCarDto = { licensePlate: 'ABC123', photo: '' };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(userId, createCarDto)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('update', () => {
    it('should update an existing car', async () => {
      const carId = 1;
      const updateCarDto: UpdateCarDto = { licensePlate: 'DEF456', photo: '' };
      const car = new Car();
      car.id = carId;

      jest.spyOn(carRepository, 'findOne').mockResolvedValue(car);
      jest.spyOn(carRepository, 'save').mockResolvedValue(car);

      const result = await service.update(carId, updateCarDto);

      expect(result).toEqual({ id: carId, ...updateCarDto });
      expect(carRepository.findOne).toHaveBeenCalledWith({
        where: { id: carId },
      });
      expect(carRepository.save).toHaveBeenCalledWith({
        ...car,
        ...updateCarDto,
        photo: null,
      });
    });

    it('should throw an error if car is not found', async () => {
      const carId = 1;
      const updateCarDto: UpdateCarDto = { licensePlate: 'DEF456', photo: '' };

      jest.spyOn(carRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(carId, updateCarDto)).rejects.toThrow(
        'Car not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove an existing car', async () => {
      const carId = 1;
      const deleteResult: DeleteResult = { raw: [], affected: 1 };

      jest.spyOn(carRepository, 'delete').mockResolvedValue(deleteResult);

      await service.remove(carId);

      expect(carRepository.delete).toHaveBeenCalledWith(carId);
    });

    it('should throw an error if car is not found', async () => {
      const carId = 1;
      const deleteResult: DeleteResult = { raw: [], affected: 0 };

      jest.spyOn(carRepository, 'delete').mockResolvedValue(deleteResult);

      await expect(service.remove(carId)).rejects.toThrow(
        'Car not found or not removed',
      );
    });
  });

  describe('findCarByUser', () => {
    it('should return a car by user', async () => {
      const userId = 1;
      const carId = 1;
      const car = new Car();
      car.id = carId;
      car.user = new User();
      car.user.id = userId;

      jest.spyOn(carRepository, 'findOne').mockResolvedValue(car);

      const result = await service.findCarByUser(userId, carId);

      expect(result).toEqual({
        id: carId,
        licensePlate: car.licensePlate,
        photo: null,
        user: car.user,
      });
      expect(carRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: carId,
          user: { id: userId },
        },
        relations: ['user'],
      });
    });
  });

  describe('findAllCarsByUserId', () => {
    it('should return all cars by user', async () => {
      const userId = 1;
      const car1 = new Car();
      car1.id = 1;
      car1.licensePlate = 'ABC123';
      car1.user = new User();
      car1.user.id = userId;

      const car2 = new Car();
      car2.id = 2;
      car2.licensePlate = 'DEF456';
      car2.user = new User();
      car2.user.id = userId;

      const cars = [car1, car2];

      jest.spyOn(carRepository, 'find').mockResolvedValue(cars);

      const result = await service.findAllCarsByUserId(userId);

      expect(result).toEqual(cars);
      expect(carRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
      });
    });
  });
});
