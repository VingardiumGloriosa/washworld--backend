import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { Repository } from 'typeorm';
import { Membership_Type } from '../membership_type/entities/membership_type.entity';
import { User } from '../user/entities/user.entity';
import { ResponseMembershipDto } from './dto/response-membership.dto';

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

  async create(userId: number, membershipTypeId: number): Promise<ResponseMembershipDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const membershipType = await this.membershipTypeRepository.findOneBy({
      id: membershipTypeId,
    });
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
      status: 'active', // Default status
    });

    const savedMembership = await this.membershipRepository.save(membership);
    if(!savedMembership) throw new ConflictException()

    return new ResponseMembershipDto(savedMembership)
  }

  async remove(userId: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException();
    }

    const membership = await this.membershipRepository.findOne({ where: { user }});
    return !!(await this.membershipRepository.remove(membership));
  }
}
