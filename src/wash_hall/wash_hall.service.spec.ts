// src/wash-hall/wash-hall.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WashHallService } from './wash_hall.service';
import { WashHall } from './entities/wash_hall.entity';
import { LocationService } from '../location/location.service';
import { CreateWashHallDto } from './dto/create-wash_hall.dto';
import { NotFoundException } from '@nestjs/common';

describe('WashHallService', () => {
  let service: WashHallService;
  let repository: Repository<WashHall>;

  const mockWashHallRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockLocationService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WashHallService,
        {
          provide: getRepositoryToken(WashHall),
          useValue: mockWashHallRepository,
        },
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    service = module.get<WashHallService>(WashHallService);
    repository = module.get<Repository<WashHall>>(getRepositoryToken(WashHall));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new wash hall', async () => {
      const createWashHallDto: CreateWashHallDto = {
        locationId: 1,
        finishTime: new Date(),
        isOutOfService: false,
      };

      const location = { id: 1, name: 'Location 1' };
      const washHall = { ...createWashHallDto, location };

      mockLocationService.findOne.mockResolvedValue(location);
      mockWashHallRepository.create.mockReturnValue(washHall);
      mockWashHallRepository.save.mockResolvedValue(washHall);

      const result = await service.create(createWashHallDto);

      expect(mockLocationService.findOne).toHaveBeenCalledWith(
        createWashHallDto.locationId,
      );
      expect(mockWashHallRepository.create).toHaveBeenCalledWith({
        ...createWashHallDto,
        location,
      });
      expect(mockWashHallRepository.save).toHaveBeenCalledWith(washHall);
      expect(result).toEqual(washHall);
    });
  });

  describe('findAll', () => {
    it('should return an array of wash halls', async () => {
      const washHalls = [{ id: 1, isOutOfService: false }];
      mockWashHallRepository.find.mockResolvedValue(washHalls);

      const result = await service.findAll();

      expect(mockWashHallRepository.find).toHaveBeenCalledWith({
        relations: ['location'],
      });
      expect(result).toEqual(washHalls);
    });
  });

  describe('findOne', () => {
    it('should return a single wash hall', async () => {
      const id = 1;
      const washHall = { id, isOutOfService: false };
      mockWashHallRepository.findOne.mockResolvedValue(washHall);

      const result = await service.findOne(id);

      expect(mockWashHallRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['location'],
      });
      expect(result).toEqual(washHall);
    });

    it('should throw a NotFoundException if wash hall is not found', async () => {
      const id = 1;
      mockWashHallRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a wash hall', async () => {
      const id = 1;
      const updateWashHallDto = { isOutOfService: true };
      const washHall = { id, isOutOfService: true };

      mockWashHallRepository.update.mockResolvedValue({ affected: 1 });
      mockWashHallRepository.findOne.mockResolvedValue(washHall);

      const result = await service.update(id, updateWashHallDto);

      expect(mockWashHallRepository.update).toHaveBeenCalledWith(
        id,
        updateWashHallDto,
      );
      expect(result).toEqual(washHall);
    });
  });

  describe('remove', () => {
    it('should remove a wash hall', async () => {
      const id = 1;
      mockWashHallRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockWashHallRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if wash hall to delete is not found', async () => {
      const id = 1;
      mockWashHallRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
