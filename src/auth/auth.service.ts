import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new this.userModel({
      email,
      username,
      password: hashedPassword,
    });
  
    await user.save();
  
    const payload = { email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user._id,
    };
  }
  

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        userId: user._id,
      };
    } else {
      throw new Error('Invalid credentials');
    }
  }
  
}
