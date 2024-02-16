import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  register(authCredentials: AuthCredentialsDto) {
    return;
  }

  login(authCredentials: AuthCredentialsDto) {
    return;
  }

  testLogin(authCredentials: AuthCredentialsDto) {
    return;
  }
}
