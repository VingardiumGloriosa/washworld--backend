import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoyaltyRewardTypeService } from './loyalty_reward_type.service';
import { CreateLoyaltyRewardTypeDto } from './dto/create-loyalty_reward_type.dto';
import { UpdateLoyaltyRewardTypeDto } from './dto/update-loyalty_reward_type.dto';

@Controller('loyalty-reward-type')
export class LoyaltyRewardTypeController {
  constructor(
    private readonly loyaltyRewardTypeService: LoyaltyRewardTypeService,
  ) {}

  @Get()
  findAll() {
    return this.loyaltyRewardTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyaltyRewardTypeService.findOne(+id);
  }
}
