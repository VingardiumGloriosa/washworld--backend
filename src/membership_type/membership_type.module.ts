import { Module } from '@nestjs/common';
import { MembershipTypeService } from './membership_type.service';
import { MembershipTypeController } from './membership_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership_Type } from './entities/membership_type.entity';

@Module({
  controllers: [MembershipTypeController],
  providers: [MembershipTypeService],
  imports: [TypeOrmModule.forFeature([Membership_Type])],
  exports: [TypeOrmModule.forFeature([Membership_Type]), MembershipTypeService],
})
export class MembershipTypeModule {}
