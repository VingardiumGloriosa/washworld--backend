import { Injectable } from '@nestjs/common';
import { CreateLoyaltyRewardDto } from './dto/create-loyalty_reward.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loyalty_Reward } from './entities/loyalty_reward.entity';
import { Repository } from 'typeorm';
import { LoyaltyRewardType } from '../loyalty_reward_type/entities/loyalty_reward_type.entity';
import { User } from '../user/entities/user.entity';
import { UpdateLoyaltyRewardStatusDto } from './dto/update-loyalty_reward-status.dto';

@Injectable()
export class LoyaltyRewardService {
  constructor(
    @InjectRepository(Loyalty_Reward)
    private loyaltyRewardRepository: Repository<Loyalty_Reward>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(LoyaltyRewardType)
    private loyaltyRewardTypeRepository: Repository<LoyaltyRewardType>,
  ) {}

  async create(
    createLoyaltyRewardDto: CreateLoyaltyRewardDto,
  ): Promise<Loyalty_Reward> {
    const { userId, loyaltyRewardTypeId } = createLoyaltyRewardDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    let loyaltyRewardType;
    if (loyaltyRewardTypeId) {
      loyaltyRewardType = await this.loyaltyRewardTypeRepository.findOne({
        where: { id: loyaltyRewardTypeId },
      });
      if (!loyaltyRewardType) {
        throw new Error('Loyalty Reward Type not found');
      }
    } else {
      const rewardTypes = await this.loyaltyRewardTypeRepository.find();
      if (rewardTypes.length === 0) {
        throw new Error('No Loyalty Reward Types available');
      }
      // Select a random reward type if no ID was provided
      loyaltyRewardType =
        rewardTypes[Math.floor(Math.random() * rewardTypes.length)];
    }

    const newReward = this.loyaltyRewardRepository.create({
      user: user,
      loyaltyRewardType: loyaltyRewardType,
      isActive: false,
    });

    return this.loyaltyRewardRepository.save(newReward);
  }

  async findAllRewardsForUser(userId: number): Promise<Loyalty_Reward[]> {
    return await this.loyaltyRewardRepository.find({
      where: { user: { id: userId } },
      relations: ['loyaltyRewardType'],
    });
  }

  async toggleRewardStatus(
    rewardId: number,
    updateDto: UpdateLoyaltyRewardStatusDto,
  ): Promise<Loyalty_Reward> {
    const reward = await this.loyaltyRewardRepository.findOne({
      where: { id: rewardId },
    });
    if (!reward) {
      throw new Error(`Loyalty reward with ID ${rewardId} not found.`);
    }

    reward.isActive = updateDto.isActive;
    return this.loyaltyRewardRepository.save(reward);
  }

  async remove(rewardId: number): Promise<void> {
    const result = await this.loyaltyRewardRepository.delete(rewardId);
    if (result.affected === 0) {
      throw new Error(`Loyalty Reward with ID ${rewardId} not found.`);
    }
  }
}
