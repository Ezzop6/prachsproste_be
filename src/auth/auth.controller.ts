import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TokenPayload } from './dto/token-payload.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TokenPayload, description: 'User registered successfully' })
  async register(@Body() authCredentials: AuthCredentialsDto): Promise<TokenPayload> {
    await this.authService.register(authCredentials);
    return await this.authService.login(authCredentials);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TokenPayload, description: 'User logged in successfully' })
  async login(@Body() authCredentials: AuthCredentialsDto): Promise<TokenPayload> {
    return await this.authService.login(authCredentials);
  }
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Test if can log in with token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User logged in successfully' })
  @Post('test')
  async testLogin(@GetUser() user: User): Promise<string> {
    return `Hello ${user.username}`;
  }
}
