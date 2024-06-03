import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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
import { UpdateProfilePhotoDto } from './dto/update-profile-photo.dto';
import { ImageCompressionService } from '../image-compression/image-compression.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly imageCompressionService: ImageCompressionService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    if (
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.fullName
    ) {
      throw new ConflictException('Email, full name and password are required');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      photo: createUserDto.photo ? await this.imageCompressionService.compressImage(Buffer.from(createUserDto.photo, "base64"), 50, { x: 300, y: 300}) : null
    });

    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const created = await this.userRepository.save(newUser);
    return new ResponseUserDto(created);
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.preload({
      id: userId,
      ...updateUserDto,
      photo: updateUserDto.photo ? await this.imageCompressionService.compressImage(Buffer.from(updateUserDto.photo, "base64"), 50, { x: 300, y: 300}) : null
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updated = await this.userRepository.save(user);
    return new ResponseUserDto(updated);
  }

  async remove(userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }

  async findUserHome(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'loyaltyRewards',
        'loyaltyRewards.loyaltyRewardType',
        'history',
        'history.location',
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new ResponseUserDto(user);
  }

  async findDetailedUser(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['membership', 'membership.membershipType', 'cars'],
    });
    console.log(user);
    if (!user) {
      throw new NotFoundException('User not found');
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
      throw new NotFoundException('User not found');
    }

    const payload: JwtPayload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new ResponseUserDto(user));
  }

  async findOne(userId: number): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException();
    }
    return new ResponseUserDto(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateProfilePhoto(
    userId: number,
    updateProfilePhotoDto: UpdateProfilePhotoDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.photo = Buffer.from(updateProfilePhotoDto.photo, 'base64');
    const updated = await this.userRepository.save(user);
    return new ResponseUserDto(updated);
  }
}
