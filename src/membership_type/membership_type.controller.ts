import { Controller, Get } from '@nestjs/common';
import { MembershipTypeService } from './membership_type.service';

@Controller('membership-types')
export class MembershipTypeController {
  constructor(private readonly membershipTypeService: MembershipTypeService) {}

  @Get()
  async getAllMembershipTypes() {
    return await this.membershipTypeService.findAll();
  }
}
