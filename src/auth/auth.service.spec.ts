import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userModel: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            findOne: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const createUserDto = { email: 'test@test.com', username: 'test', password: 'test' };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      userModel.create.mockResolvedValue({ ...createUserDto, password: 'hashedPassword' });
      const result = await service.register(createUserDto);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const loginUserDto = { email: 'test@test.com', password: 'test' };
      userModel.findOne.mockResolvedValue({ email: 'test@test.com', password: 'hashedPassword' });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const result = await service.login(loginUserDto);
      expect(result).toEqual({ access_token: 'token' });
    });

    it('should throw an error if invalid credentials', async () => {
      const loginUserDto = { email: 'test@test.com', password: 'test' };
      userModel.findOne.mockResolvedValue(null);
      await expect(service.login(loginUserDto)).rejects.toThrow('Invalid credentials');
    });
  });
});
