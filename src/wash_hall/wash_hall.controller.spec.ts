import { Test, TestingModule } from '@nestjs/testing';
import { WashHallController } from './wash_hall.controller';
import { WashHallService } from './wash_hall.service';
import { CreateWashHallDto } from './dto/create-wash_hall.dto';
import { UpdateWashHallDto } from './dto/update-wash_hall.dto';
import { NotFoundException } from '@nestjs/common';

describe('WashHallController', () => {
  let controller: WashHallController;
  let service: WashHallService;

  const mockWashHallService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashHallController],
      providers: [
        {
          provide: WashHallService,
          useValue: mockWashHallService,
        },
      ],
    }).compile();

    controller = module.get<WashHallController>(WashHallController);
    service = module.get<WashHallService>(WashHallService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new wash hall', async () => {
      const createWashHallDto: CreateWashHallDto = {
        locationId: 1,
        finishTime: new Date(),
        isOutOfService: false,
      };
      const washHall = { id: 1, ...createWashHallDto };

      mockWashHallService.create.mockResolvedValue(washHall);

      const result = await controller.create(createWashHallDto);

      expect(mockWashHallService.create).toHaveBeenCalledWith(
        createWashHallDto,
      );
      expect(result).toEqual(washHall);
    });
  });

  describe('findAll', () => {
    it('should return an array of wash halls', async () => {
      const washHalls = [{ id: 1, isOutOfService: false }];
      mockWashHallService.findAll.mockResolvedValue(washHalls);

      const result = await controller.findAll();

      expect(mockWashHallService.findAll).toHaveBeenCalled();
      expect(result).toEqual(washHalls);
    });
  });

  describe('findOne', () => {
    it('should return a single wash hall', async () => {
      const id = 1;
      const washHall = { id, isOutOfService: false };

      mockWashHallService.findOne.mockResolvedValue(washHall);

      const result = await controller.findOne(id);

      expect(mockWashHallService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(washHall);
    });

    it('should throw a NotFoundException if wash hall is not found', async () => {
      const id = 1;
      mockWashHallService.findOne.mockResolvedValue(null);

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a wash hall', async () => {
      const id = 1;
      const updateWashHallDto: UpdateWashHallDto = { isOutOfService: true };
      const washHall = { id, isOutOfService: true };

      mockWashHallService.update.mockResolvedValue(washHall);

      const result = await controller.update(id, updateWashHallDto);

      expect(mockWashHallService.update).toHaveBeenCalledWith(
        id,
        updateWashHallDto,
      );
      expect(result).toEqual(washHall);
    });
  });

  describe('remove', () => {
    it('should remove a wash hall', async () => {
      const id = 1;

      mockWashHallService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(id);

      expect(mockWashHallService.remove).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });
});
