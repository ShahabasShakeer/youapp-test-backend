import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile } from './models/profile.model';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getModelToken('Profile'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    profileModel = module.get(getModelToken('Profile'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create a profile', async () => {
      const createProfileDto = { userId: 'userId', about: 'about' };
      profileModel.create.mockResolvedValue(createProfileDto);
      const result = await service.createProfile(createProfileDto);
      expect(result).toEqual(createProfileDto);
    });
  });

  describe('getProfile', () => {
    it('should return a profile', async () => {
      const userId = 'userId';
      profileModel.findOne.mockResolvedValue({ userId, about: 'about' });
      const result = await service.getProfile(userId);
      expect(result).toEqual({ userId, about: 'about' });
    });
  });

  describe('updateProfile', () => {
    it('should update a profile', async () => {
      const userId = 'userId';
      const updateProfileDto = { about: 'new about' };
      profileModel.findOneAndUpdate.mockResolvedValue({ userId, ...updateProfileDto });
      const result = await service.updateProfile(userId, updateProfileDto);
      expect(result).toEqual({ userId, ...updateProfileDto });
    });
  });
});
