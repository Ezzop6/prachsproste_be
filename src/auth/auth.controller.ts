import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.register(authCredentials);
  }

  @Post('login')
  login(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.login(authCredentials);
  }

  @Post('test')
  test(@Body() authCredentials: AuthCredentialsDto) {
    return this.authService.testLogin(authCredentials);
  }
}
