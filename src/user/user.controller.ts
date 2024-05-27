import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { MatchUserIdGuard } from '../jwt/jwt-auth.guard';

const LOYALTY_REWARD_GOAL = 6

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.userService.login(loginDto);
  }

  @Get(':userId')
  @UseGuards(MatchUserIdGuard)
  async getUser(@Param('userId') id: string) {
    return await this.userService.findDetailedUser(Number(id));
  }

  @Get(':userId/home')
  @UseGuards(MatchUserIdGuard)
  async getUserHome(@Param('userId') id: string) {
    const user = await this.userService.findDetailedUser(Number(id));
    return {
      loyaltyRewards: user.loyaltyRewards,
      loyaltyRewardProgress: {
        progress: (user.history?.length || 0) % LOYALTY_REWARD_GOAL,
        goal: LOYALTY_REWARD_GOAL
      },
      history: user.history
    };
  }
}
