import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership_Type } from './entities/membership_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipTypeService {
  constructor(
    @InjectRepository(Membership_Type)
    private membershipTypeRepository: Repository<Membership_Type>,
  ) {}

  async findAll(): Promise<Membership_Type[]> {
    return this.membershipTypeRepository.find();
  }
}
