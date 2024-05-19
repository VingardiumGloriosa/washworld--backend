import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembershipTypeService } from './membership_type.service';
import { CreateMembershipTypeDto } from './dto/create-membership_type.dto';
import { UpdateMembershipTypeDto } from './dto/update-membership_type.dto';

@Controller('membership-type')
export class MembershipTypeController {
  constructor(private readonly membershipTypeService: MembershipTypeService) {}

  @Post()
  create(@Body() createMembershipTypeDto: CreateMembershipTypeDto) {
    return this.membershipTypeService.create(createMembershipTypeDto);
  }

  @Get()
  findAll() {
    return this.membershipTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membershipTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMembershipTypeDto: UpdateMembershipTypeDto,
  ) {
    return this.membershipTypeService.update(+id, updateMembershipTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membershipTypeService.remove(+id);
  }
}
