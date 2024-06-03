import { Test, TestingModule } from '@nestjs/testing';
import { MembershipService } from './membership.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { Membership_Type } from '../membership_type/entities/membership_type.entity';
import { User } from '../user/entities/user.entity';

describe('MembershipService', () => {
  let service: MembershipService;
  let membershipRepository: Repository<Membership>;
  let membershipTypeRepository: Repository<Membership_Type>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembershipService,
        {
          provide: getRepositoryToken(Membership),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Membership_Type),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MembershipService>(MembershipService);
    membershipRepository = module.get<Repository<Membership>>(
      getRepositoryToken(Membership)
    );
    membershipTypeRepository = module.get<Repository<Membership_Type>>(
      getRepositoryToken(Membership_Type)
    );
    userRepository = module.get<Repository<User>>(
      getRepositoryToken(User)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new membership', async () => {
      const userId = 1;
      const membershipTypeId = 1;

      const user = new User();
      user.id = userId;

      const membershipType = new Membership_Type();
      membershipType.id = membershipTypeId;

      const saveMock = jest.fn();
      //membershipRepository.create.mockReturnValue({ ...user, ...membershipType });
      membershipRepository.save = saveMock.mockResolvedValue({ ...user, ...membershipType });

      const result = await service.create(userId, membershipTypeId);

      expect(saveMock).toHaveBeenCalled();
      expect(result.user.id).toEqual(userId);
      expect(result.membershipType.id).toEqual(membershipTypeId);
    });

    it('should throw an error if user or membership type not found', async () => {
      const userId = 1;
      const membershipTypeId = 1;

      userRepository.findOneBy = jest.fn().mockResolvedValue(undefined);
      membershipTypeRepository.findOneBy = jest.fn().mockResolvedValue(undefined);

      await expect(service.create(userId, membershipTypeId)).rejects.toThrowError('User or membership type not found');
    });
  });

  describe('remove', () => {
    it('should remove a membership', async () => {
      const membershipId = 1;
      const membership = new Membership();
      membership.id = membershipId;

      membershipRepository.findOneBy = jest.fn().mockResolvedValue(membership);
      membershipRepository.remove = jest.fn().mockResolvedValue(membership);

      const result = await service.remove(membershipId);

      expect(result).toEqual(membership);
    });

    it('should throw an error if membership not found', async () => {
      const membershipId = 1;

      membershipRepository.findOneBy = jest.fn().mockResolvedValue(undefined);

      await expect(service.remove(membershipId)).rejects.toThrowError('Membership not found');
    });
  });
});
