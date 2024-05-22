import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

const LOYALTY_REWARD_GOAL = 6

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findDetailedUser(Number(id));
  }

  @Get(':id/home')
  async getUserHome(@Param('id') id: string) {
    const user = await this.userService.findDetailedUser(Number(id));
    return {
      loyaltyRewards: user.loyaltyRewards,
      loyaltyRewardProgress: {
        progress: user.history.length % LOYALTY_REWARD_GOAL,
        goal: LOYALTY_REWARD_GOAL
      },
      history: user.history
    };
  }
}
