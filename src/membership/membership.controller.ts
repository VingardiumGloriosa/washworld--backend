import { Controller, Post, Param, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { CreateMembershipDto } from './dto/create-membership.dto';

@Controller('user/:userId/membership')
export class MembershipController {
  constructor(private readonly membershipsService: MembershipService) {}

  @Post()
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
