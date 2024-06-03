import { NotFoundException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyRewardType } from './entities/loyalty_reward_type.entity';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';

describe('LoyaltyRewardTypeService', () => {
  let service: LoyaltyRewardTypeService;
  let loyaltyRewardTypeRepositoryMock: Repository<LoyaltyRewardType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyRewardTypeService,
        {
          provide: getRepositoryToken(LoyaltyRewardType),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LoyaltyRewardTypeService>(LoyaltyRewardTypeService);
    loyaltyRewardTypeRepositoryMock = module.get<Repository<LoyaltyRewardType>>(
      getRepositoryToken(LoyaltyRewardType),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of loyalty reward types', async () => {
      const loyaltyRewardTypes: LoyaltyRewardType[] = [
        { id: 1, name: 'Type A', rewards: [] },
        { id: 2, name: 'Type B', rewards: [] },
      ];
      jest
        .spyOn(loyaltyRewardTypeRepositoryMock, 'find')
        .mockResolvedValueOnce(loyaltyRewardTypes);

      const result = await service.findAll();

      expect(result).toEqual(loyaltyRewardTypes);
    });
  });

  describe('findOne', () => {
    it('should return a loyalty reward type by id', async () => {
      const loyaltyRewardType: LoyaltyRewardType = {
        id: 1,
        name: 'Type A',
        rewards: [],
      };
      const id = 1;
      jest
        .spyOn(loyaltyRewardTypeRepositoryMock, 'findOne')
        .mockResolvedValueOnce(loyaltyRewardType);

      const result = await service.findOne(id);

      expect(result).toEqual(loyaltyRewardType);
    });

    it('should throw NotFoundException if loyalty reward type is not found', async () => {
      const id = 999;
      jest
        .spyOn(loyaltyRewardTypeRepositoryMock, 'findOne')
        .mockResolvedValueOnce(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });
});
