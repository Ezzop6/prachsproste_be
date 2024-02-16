import { ConflictException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokenPayload } from './dto/token-payload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtAccessToken } from './dto/auth-jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { tokenDuration } from 'config/jwtStrategyConfig';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(authCredentials: AuthCredentialsDto): Promise<HttpStatus> {
    const { username, password } = authCredentials;
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return HttpStatus.CREATED;
  }

  async validateUserPassword(authCredentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  async login(authCredentials: AuthCredentialsDto): Promise<TokenPayload> {
    const username = await this.validateUserPassword(authCredentials);
    if (!username) {
      throw new ConflictException('Invalid credentials');
    }
    const payload: JwtAccessToken = { username };

    const accessToken = this.jwtService.sign(payload);
    const token = { accessToken, tokenDuration: tokenDuration, timestamp: Date.now() };
    return token;
  }

  hashPassword = async (password: string, salt: string): Promise<string> => {
    return await bcrypt.hash(password, salt);
  };
}
