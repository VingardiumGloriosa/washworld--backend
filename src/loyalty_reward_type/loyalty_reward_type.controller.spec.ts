import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { LoyaltyRewardTypeController } from './loyalty_reward_type.controller';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';

describe('LoyaltyRewardTypeController', () => {
  let controller: LoyaltyRewardTypeController;
  let service: LoyaltyRewardTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyRewardTypeController],
      providers: [LoyaltyRewardTypeService],
    }).compile();

    controller = module.get<LoyaltyRewardTypeController>(
      LoyaltyRewardTypeController,
    );
    service = module.get<LoyaltyRewardTypeService>(LoyaltyRewardTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of loyalty reward types', async () => {
      const loyaltyRewardTypes = [
        { id: 1, name: 'Type A', rewards: [] },
        { id: 2, name: 'Type B', rewards: [] },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(loyaltyRewardTypes);

      const result = await controller.findAll();

      expect(result).toEqual(loyaltyRewardTypes);
    });
  });

  describe('findOne', () => {
    it('should return a single loyalty reward type by ID', async () => {
      const id = '1';
      const loyaltyRewardType = { id: 1, name: 'Type A', rewards: [] };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(loyaltyRewardType);

      const result = await controller.findOne(id);

      expect(result).toEqual(loyaltyRewardType);
    });

    it('should throw NotFoundException if loyalty reward type is not found', async () => {
      const id = '999';
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });
});
