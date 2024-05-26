import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { Car } from '@src/car/entities/car.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = this.userRepository.create(createUserDto);
    const created = await this.userRepository.save(newUser);
    return this.userToUserDto(created);
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.preload({
      id: userId,
      ...updateUserDto,
    });
    if (!user) {
      throw new Error('User not found');
    }
    const updated = await this.userRepository.save(user);
    return this.userToUserDto(updated);
  }

  async remove(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepository.remove(user);
  }

  async findDetailedUser(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'membership',
        'membership.membershipType',
        'cars',
        'loyaltyRewards',
        'history',
        'history.location',
      ],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userToUserDto(user);
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.userToUserDto(user));
  }

  async findOne(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userToUserDto(user);
  }

  private userToUserDto(user: User): ResponseUserDto {
    if (!user) {
      throw new Error(`user not found`);
    }

    const userDto = new ResponseUserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.fullName = user.fullName;
    userDto.membership = user.membership;
    userDto.cars = user.cars;
    userDto.loyaltyRewards = user.loyaltyRewards;
    userDto.history = user.history;

    if (user.photo) {
      userDto.photo = `data:image/jpeg;base64,${user.photo}`;
    }

    return userDto;
  }
}
