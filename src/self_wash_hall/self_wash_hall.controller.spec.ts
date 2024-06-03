import { Test, TestingModule } from '@nestjs/testing';
import { SelfWashHallService } from './self_wash_hall.service';
import { UpdateSelfWashHallDto } from './dto/update-self_wash_hall.dto';
import { SelfWashHallController } from './self_wash_hall.controller';
import { CreateSelfWashHallDto } from './dto/create-self_wash_hall.dto';

describe('SelfWashHallController', () => {
  let controller: SelfWashHallController;
  let service: SelfWashHallService;

  const mockSelfWashHallService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfWashHallController],
      providers: [
        {
          provide: SelfWashHallService,
          useValue: mockSelfWashHallService,
        },
      ],
    }).compile();

    controller = module.get<SelfWashHallController>(SelfWashHallController);
    service = module.get<SelfWashHallService>(SelfWashHallService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new self wash hall', async () => {
      const createSelfWashHallDto: CreateSelfWashHallDto = {
        locationId: 1,
        isInUse: false,
        isOutOfService: false,
      };
      const selfWashHall = { id: 1, ...createSelfWashHallDto };

      mockSelfWashHallService.create.mockResolvedValue(selfWashHall);

      const result = await controller.create(createSelfWashHallDto);

      expect(mockSelfWashHallService.create).toHaveBeenCalledWith(
        createSelfWashHallDto,
      );
      expect(result).toEqual(selfWashHall);
    });
  });

  describe('findAll', () => {
    it('should return an array of self wash halls', async () => {
      const selfWashHalls = [{ id: 1, isInUse: false, isOutOfService: false }];
      mockSelfWashHallService.findAll.mockResolvedValue(selfWashHalls);

      const result = await controller.findAll();

      expect(mockSelfWashHallService.findAll).toHaveBeenCalled();
      expect(result).toEqual(selfWashHalls);
    });
  });

  describe('findOne', () => {
    it('should return a single self wash hall', async () => {
      const id = 1;
      const selfWashHall = { id, isInUse: false, isOutOfService: false };

      mockSelfWashHallService.findOne.mockResolvedValue(selfWashHall);

      const result = await controller.findOne(id);

      expect(mockSelfWashHallService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(selfWashHall);
    });
  });

  describe('update', () => {
    it('should update a self wash hall', async () => {
      const id = 1;
      const updateSelfWashHallDto: UpdateSelfWashHallDto = { isInUse: true };
      const selfWashHall = { id, isInUse: true, isOutOfService: false };

      mockSelfWashHallService.update.mockResolvedValue(selfWashHall);

      const result = await controller.update(id, updateSelfWashHallDto);

      expect(mockSelfWashHallService.update).toHaveBeenCalledWith(
        id,
        updateSelfWashHallDto,
      );
      expect(result).toEqual(selfWashHall);
    });
  });

  describe('remove', () => {
    it('should remove a self wash hall', async () => {
      const id = 1;

      mockSelfWashHallService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(id);

      expect(mockSelfWashHallService.remove).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });
  });
});