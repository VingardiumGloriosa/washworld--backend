import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { Membership } from './entities/membership.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipTypeModule } from 'src/membership_type/membership_type.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [MembershipController],
  providers: [MembershipService],
  imports: [TypeOrmModule.forFeature([Membership]), MembershipTypeModule, UserModule],
  exports: [TypeOrmModule.forFeature([Membership]), MembershipService],
})
export class MembershipModule {}
