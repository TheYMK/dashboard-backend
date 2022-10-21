import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    // check if user already exists
    const users = await this.usersService.find(data.username);

    if (users.length) {
      throw new BadRequestException('Username in use');
    }

    // Hash the user's password

    // 1- Generate a salt
    const salt = randomBytes(8).toString('hex');
    // 2- Generate a password hash
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    // 3- Join the hash and the salt
    const result = salt + '.' + hash.toString('hex');
    // 4- Create a new user and save it to the database

    const userData = {
      ...data,
      password: result,
    };

    try {
      const user = await this.usersService.create(userData);
      return user;
    } catch (err) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async signin(username: string, password: string) {
    const [user] = await this.usersService.find(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    return user;
  }
}
