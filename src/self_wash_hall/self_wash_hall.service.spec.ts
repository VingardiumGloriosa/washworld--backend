// src/self-wash-hall/self-wash-hall.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelfWashHallService } from './self_wash_hall.service';
import { SelfWashHall } from './entities/self_wash_hall.entity';
import { LocationService } from '../location/location.service';
import { CreateSelfWashHallDto } from './dto/create-self_wash_hall.dto';
import { NotFoundException } from '@nestjs/common';

describe('SelfWashHallService', () => {
  let service: SelfWashHallService;
  let repository: Repository<SelfWashHall>;

  const mockSelfWashHallRepository = {
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
        SelfWashHallService,
        {
          provide: getRepositoryToken(SelfWashHall),
          useValue: mockSelfWashHallRepository,
        },
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    service = module.get<SelfWashHallService>(SelfWashHallService);
    repository = module.get<Repository<SelfWashHall>>(
      getRepositoryToken(SelfWashHall),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new self wash hall', async () => {
      const createSelfWashHallDto: CreateSelfWashHallDto = {
        locationId: 1,
        is_in_use: false,
        is_out_of_service: false,
      };

      const location = { id: 1, name: 'Location 1' };
      const selfWashHall = { ...createSelfWashHallDto, location };

      mockLocationService.findOne.mockResolvedValue(location);
      mockSelfWashHallRepository.create.mockReturnValue(selfWashHall);
      mockSelfWashHallRepository.save.mockResolvedValue(selfWashHall);

      const result = await service.create(createSelfWashHallDto);

      expect(mockLocationService.findOne).toHaveBeenCalledWith(
        createSelfWashHallDto.locationId,
      );
      expect(mockSelfWashHallRepository.create).toHaveBeenCalledWith({
        ...createSelfWashHallDto,
        location,
      });
      expect(mockSelfWashHallRepository.save).toHaveBeenCalledWith(
        selfWashHall,
      );
      expect(result).toEqual(selfWashHall);
    });
  });

  describe('findAll', () => {
    it('should return an array of self wash halls', async () => {
      const selfWashHalls = [
        { id: 1, is_in_use: false, is_out_of_service: false },
      ];
      mockSelfWashHallRepository.find.mockResolvedValue(selfWashHalls);

      const result = await service.findAll();

      expect(mockSelfWashHallRepository.find).toHaveBeenCalledWith({
        relations: ['location'],
      });
      expect(result).toEqual(selfWashHalls);
    });
  });

  describe('findOne', () => {
    it('should return a single self wash hall', async () => {
      const id = 1;
      const selfWashHall = { id, is_in_use: false, is_out_of_service: false };
      mockSelfWashHallRepository.findOne.mockResolvedValue(selfWashHall);

      const result = await service.findOne(id);

      expect(mockSelfWashHallRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['location'],
      });
      expect(result).toEqual(selfWashHall);
    });

    it('should throw a NotFoundException if self wash hall is not found', async () => {
      const id = 1;
      mockSelfWashHallRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a self wash hall', async () => {
      const id = 1;
      const updateSelfWashHallDto = { is_in_use: true };
      const selfWashHall = { id, is_in_use: true, is_out_of_service: false };

      mockSelfWashHallRepository.update.mockResolvedValue({ affected: 1 });
      mockSelfWashHallRepository.findOne.mockResolvedValue(selfWashHall);

      const result = await service.update(id, updateSelfWashHallDto);

      expect(mockSelfWashHallRepository.update).toHaveBeenCalledWith(
        id,
        updateSelfWashHallDto,
      );
      expect(result).toEqual(selfWashHall);
    });
  });

  describe('remove', () => {
    it('should remove a self wash hall', async () => {
      const id = 1;
      mockSelfWashHallRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockSelfWashHallRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if self wash hall to delete is not found', async () => {
      const id = 1;
      mockSelfWashHallRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
