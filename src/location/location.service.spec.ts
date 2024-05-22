import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { NotFoundException } from '@nestjs/common';

describe('LocationService', () => {
  let service: LocationService;
  let repository: Repository<Location>;

  const mockLocationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getRepositoryToken(Location),
          useValue: mockLocationRepository,
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    repository = module.get<Repository<Location>>(getRepositoryToken(Location));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new location', async () => {
      const createLocationDto: CreateLocationDto = {
        name: 'Test Location',
        address: '123 Test St',
        maps_url: 'http://maps.example.com',
      };

      const location = { id: 1, ...createLocationDto };

      mockLocationRepository.create.mockReturnValue(location);
      mockLocationRepository.save.mockResolvedValue(location);

      const result = await service.create(createLocationDto);

      expect(mockLocationRepository.create).toHaveBeenCalledWith(
        createLocationDto,
      );
      expect(mockLocationRepository.save).toHaveBeenCalledWith(location);
      expect(result).toEqual(location);
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const locations = [{ id: 1, name: 'Test Location' }];
      mockLocationRepository.find.mockResolvedValue(locations);

      const result = await service.findAll();

      expect(mockLocationRepository.find).toHaveBeenCalled();
      expect(result).toEqual(locations);
    });
  });

  describe('findOne', () => {
    it('should return a single location', async () => {
      const id = 1;
      const location = { id, name: 'Test Location' };
      mockLocationRepository.findOneBy.mockResolvedValue(location);

      const result = await service.findOne(id);

      expect(mockLocationRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(location);
    });

    it('should throw a NotFoundException if location is not found', async () => {
      const id = 1;
      mockLocationRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const id = 1;
      const updateLocationDto = { name: 'Updated Location' };
      const location = { id, ...updateLocationDto };

      mockLocationRepository.update.mockResolvedValue({ affected: 1 });
      mockLocationRepository.findOneBy.mockResolvedValue(location);

      const result = await service.update(id, updateLocationDto);

      expect(mockLocationRepository.update).toHaveBeenCalledWith(
        id,
        updateLocationDto,
      );
      expect(result).toEqual(location);
    });
  });

  describe('remove', () => {
    it('should remove a location', async () => {
      const id = 1;
      mockLocationRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockLocationRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw a NotFoundException if location to delete is not found', async () => {
      const id = 1;
      mockLocationRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
