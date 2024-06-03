import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateProfilePhotoDto } from './dto/update-profile-photo.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        fullName: 'Test User',
      };
      const expectedResult = { id: 1, email: '', password: '', fullName: "", photo: '', membership: null,
      cars: [], loyaltyRewards: [], history: [] };
      jest.spyOn(userService, 'create').mockResolvedValueOnce(expectedResult);

      const result = await controller.signUp(createUserDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('delete', () => {
    it('should delete the user', async () => {
      const userId = 1;
      jest.spyOn(userService, 'remove').mockResolvedValueOnce();

      const result = await controller.delete(userId);

      expect(result).toBeUndefined();
    });
  });

  describe('login', () => {
    it('should login the user', async () => {
      const loginDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password',
      };
      const expectedResult = { access_token: 'token' };
      jest.spyOn(userService, 'login').mockResolvedValueOnce(expectedResult);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getUser', () => {
    it('should return detailed user information', async () => {
      const userId = 1;
      const detailedUser = { id: userId, fullName: 'Test User', email: "", password: "", membership: null, cars: [], loyaltyRewards: [], history: [] };
      jest.spyOn(userService, 'findDetailedUser').mockResolvedValueOnce(detailedUser);

      const result = await controller.getUser(userId);

      expect(result).toEqual(detailedUser);
    });
  });

  describe('getUserHome', () => {
    it('should return user home information', async () => {
      const userId = 1;
      const userHome = {
        loyaltyRewards: [],
        loyaltyRewardProgress: { progress: 0, goal: 6 },
        history: [],
        id: 1,
        email: '',
        password: '',
        fullName: '',
        membership: null,
        cars: []
      };
      jest.spyOn(userService, 'findUserHome').mockResolvedValueOnce(userHome);

      const result = await controller.getUserHome(userId);

      expect(result).toEqual(userHome);
    });
  });

  describe('updateProfilePhoto', () => {
    it('should update the user profile photo', async () => {
      const userId = 1;
      const updateProfilePhotoDto: UpdateProfilePhotoDto = {
        photo: 'base64string',
        readonly: undefined,
        
      };
      const expectedResult = { id: userId, photo: 'base64string', email: '', password: '', fullName: '', membership: null,
                             cars: [], loyaltyRewards: [], history: []};
      jest.spyOn(userService, 'updateProfilePhoto').mockResolvedValueOnce(expectedResult);
  
      const result = await controller.updateProfilePhoto(userId, updateProfilePhotoDto);
  
      expect(result).toEqual(expectedResult);
    });
  });
});
