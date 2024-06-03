import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateProfilePhotoDto } from './dto/update-profile-photo.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateProfilePhoto', () => {
    it('should update the user photo', async () => {
      const userId = 1;
      const updateProfilePhotoDto: UpdateProfilePhotoDto = {
        photo: 'base64string',
        readonly: undefined
      };
      const user = new User();
      user.id = userId;

      mockUserRepository.findOneBy.mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue({
        ...user,
        photo: Buffer.from(updateProfilePhotoDto.photo, 'base64'),
      });

      const result = await service.updateProfilePhoto(
        userId,
        updateProfilePhotoDto,
      );

      expect(result).toEqual({
        id: userId,
        photo: Buffer.from(updateProfilePhotoDto.photo, 'base64'),
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = 1;
      const updateProfilePhotoDto: UpdateProfilePhotoDto = {
        photo: 'base64string',
        readonly: undefined
      };

      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.updateProfilePhoto(userId, updateProfilePhotoDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
