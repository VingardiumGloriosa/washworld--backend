import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoyaltyRewardType } from './entities/loyalty_reward_type.entity';

@Injectable()
export class LoyaltyRewardTypeService {
  constructor(
    @InjectRepository(LoyaltyRewardType)
    private loyaltyRewardTypeRepository: Repository<LoyaltyRewardType>,
  ) {}

  async findAll(): Promise<LoyaltyRewardType[]> {
    return await this.loyaltyRewardTypeRepository.find();
  }

  async findOne(id: number): Promise<LoyaltyRewardType> {
    const rewardType = await this.loyaltyRewardTypeRepository.findOne({
      where: { id: id },
    });

    if (!rewardType) {
      throw new NotFoundException(`LoyaltyRewardType with ID ${id} not found.`);
    }
    return rewardType;
  }
}
