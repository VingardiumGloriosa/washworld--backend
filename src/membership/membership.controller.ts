import { Controller, Post, Param, Body, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { MatchUserIdGuard } from '../jwt/jwt-auth.guard';

@Controller('user/:userId/membership')
export class MembershipController {
  constructor(private readonly membershipsService: MembershipService) {}

  @Post()
  @UseGuards(MatchUserIdGuard)
  async createMembership(
    @Param('userId') userId: string,
    @Body() createMembershipDto: CreateMembershipDto
  ) {
    try {
      return await this.membershipsService.create(Number(userId), createMembershipDto.membershipTypeId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':membershipId')
  @UseGuards(MatchUserIdGuard)
  async deleteMembership(
    @Param('userId') userId: string,
    @Param('membershipId') membershipId: string
  ) {
    try {
      return await this.membershipsService.remove(Number(membershipId));
    } catch (error) {
      throw new HttpException('Membership not found', HttpStatus.NOT_FOUND);
    }
  }
}
