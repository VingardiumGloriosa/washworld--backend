import { Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';
import { Membership_Type } from 'src/membership_type/entities/membership_type.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    @InjectRepository(Membership_Type)
    private membershipTypeRepository: Repository<Membership_Type>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createMembership(userId: number, membershipTypeId: number): Promise<Membership> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const membershipType = await this.membershipTypeRepository.findOneBy({ id: membershipTypeId });
    if (!user || !membershipType) {
        throw new Error('User or membership type not found');
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 30);

    const membership = this.membershipRepository.create({
      user: user,
      membershipType: membershipType,
      start_date: startDate,
      end_date: endDate,
      status: 'active'  // Default status
    });

    return this.membershipRepository.save(membership);
  }

  async removeMembership(membershipId: number): Promise<Membership | undefined> {
    const membership = await this.membershipRepository.findOneBy({ id: membershipId });
    if (!membership) {
        throw new Error('Membership not found');
    }
    return await this.membershipRepository.remove(membership);
  }
}