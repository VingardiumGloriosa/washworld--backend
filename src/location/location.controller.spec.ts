import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockLocationService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockLocationService,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new location', async () => {
      const createLocationDto: CreateLocationDto = {
        name: 'Test Location',
        address: '123 Test St',
        mapsUrl: 'http://maps.example.com',
      };
      const location = { id: 1, ...createLocationDto };

      mockLocationService.create.mockResolvedValue(location);

      const result = await controller.create(createLocationDto);

      expect(mockLocationService.create).toHaveBeenCalledWith(
        createLocationDto,
      );
      expect(result).toEqual(location);
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const locations = [{ id: 1, name: 'Test Location' }];
      mockLocationService.findAll.mockResolvedValue(locations);

      const result = await controller.findAll();

      expect(mockLocationService.findAll).toHaveBeenCalled();
      expect(result).toEqual(locations);
    });
  });

  describe('findOne', () => {
    it('should return a single location', async () => {
      const id = 1;
      const location = { id, name: 'Test Location' };

      mockLocationService.findOne.mockResolvedValue(location);

      const result = await controller.findOne(id);

      expect(mockLocationService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(location);
    });
  });

  describe('update', () => {
    it('should update a location', async () => {
      const id = 1;
      const updateLocationDto: UpdateLocationDto = { name: 'Updated Location' };
      const location = { id, ...updateLocationDto };

      mockLocationService.update.mockResolvedValue(location);

      const result = await controller.update(id, updateLocationDto);

      expect(mockLocationService.update).toHaveBeenCalledWith(
        id,
        updateLocationDto,
      );
      expect(result).toEqual(location);
    });
  });

  describe('remove', () => {
    it('should remove a location', async () => {
      const id = 1;

      mockLocationService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(id);

      expect(mockLocationService.remove).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });
});
