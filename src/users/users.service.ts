import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);
    return this.generateToken(user);
  }
  async registration(createUserDto: CreateUserDto) {
    const candidateEmail = await this.getUserByEmail(createUserDto.email);
    if (candidateEmail) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const candidateUserName = await this.getUserByUsername(
      createUserDto.userName,
    );
    if (candidateUserName) {
      throw new HttpException(
        'Пользователь с таким именем существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }
  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
  async getUserByUsername(userName: string) {
    return this.userRepository.findOne({
      where: { userName },
      include: { all: true },
    });
  }
  private async generateToken(user: User) {
    const payload = { email: user.email, userId: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.getUserByEmail(loginUserDto.email);
    const passwordEquals = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }
}
