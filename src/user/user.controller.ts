import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { UserId } from '../jwt/user-id.decorator';
import { UpdateProfilePhotoDto } from './dto/update-profile-photo.dto';

export const LOYALTY_REWARD_GOAL = 6;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@UserId() userId: number) {
    return this.userService.remove(userId);
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    return this.userService.login(loginDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@UserId() userId: number) {
    return await this.userService.findDetailedUser(userId);
  }

  @Get('home')
  @UseGuards(JwtAuthGuard)
  async getUserHome(@UserId() userId: number) {
    const user = await this.userService.findDetailedUser(userId);
    return {
      loyaltyRewards: user.loyaltyRewards,
      loyaltyRewardProgress: {
        progress: (user.history?.length || 0) % LOYALTY_REWARD_GOAL,
        goal: LOYALTY_REWARD_GOAL,
      },
      history: user.history,
    };
  }

  @Post('update-photo')
  @UseGuards(JwtAuthGuard)
  async updateProfilePhoto(
    @UserId() userId: number,
    @Body() updateProfilePhotoDto: UpdateProfilePhotoDto,
  ) {
    return await this.userService.updateProfilePhoto(
      userId,
      updateProfilePhotoDto,
    );
  }
}
