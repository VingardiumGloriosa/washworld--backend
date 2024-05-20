import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.preload({
      id: userId,
      ...updateUserDto,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.save(user);
  }

  async remove(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }

  async findDetailedUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'membership', 
        'membership.membershipType', 
        'cars', 
        'loyaltyRewards', 
        'history', 
        'history.location'
      ]
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
