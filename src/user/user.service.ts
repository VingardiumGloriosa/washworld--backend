import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../jwt/jwt.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const created = await this.userRepository.save(newUser);
    return new ResponseUserDto(created)
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
      return null
    }
    const updated = await this.userRepository.save(user);
    return new ResponseUserDto(updated)
  }

  async remove(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw null;
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
        'loyaltyRewards.loyaltyRewardType',
        'history', 
        'history.location'
      ]
    });
    if (!user) {
      throw new Error('User not found');
    }
    return new ResponseUserDto(user);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return null;
    }

    const payload: JwtPayload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find()
    return users.map(user => new ResponseUserDto(user));
  }

  async findOne(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return new ResponseUserDto(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
