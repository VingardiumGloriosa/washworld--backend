import { Injectable } from '@nestjs/common';
import { CreateLoyaltyRewardTypeDto } from './dto/create-loyalty_reward_type.dto';
import { UpdateLoyaltyRewardTypeDto } from './dto/update-loyalty_reward_type.dto';

@Injectable()
export class LoyaltyRewardTypeService {
  create(createLoyaltyRewardTypeDto: CreateLoyaltyRewardTypeDto) {
    return 'This action adds a new loyaltyRewardType';
  }

  findAll() {
    return `This action returns all loyaltyRewardType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loyaltyRewardType`;
  }

  update(id: number, updateLoyaltyRewardTypeDto: UpdateLoyaltyRewardTypeDto) {
    return `This action updates a #${id} loyaltyRewardType`;
  }

  remove(id: number) {
    return `This action removes a #${id} loyaltyRewardType`;
  }
}
