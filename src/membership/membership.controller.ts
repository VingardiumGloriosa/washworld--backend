import {
  Controller,
  Post,
  Param,
  Body,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { JwtAuthGuard, MatchUserIdGuard } from '../jwt/jwt-auth.guard';
import { UserId } from '../jwt/user-id.decorator';

@Controller('users/membership')
export class MembershipController {
  constructor(private readonly membershipsService: MembershipService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMembership(
    @UserId() userId: number,
    @Body() createMembershipDto: CreateMembershipDto,
  ) {
    try {
      return await this.membershipsService.create(
        userId,
        createMembershipDto.membershipTypeId,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteMembership(@UserId() userId: number) {
    try {
      return await this.membershipsService.remove(userId);
    } catch (error) {
      console.log(error.message)
      throw new HttpException('Membership not found', HttpStatus.NOT_FOUND);
    }
  }
}
