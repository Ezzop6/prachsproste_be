import * as config from 'config';
import { IAuthModuleOptions } from '@nestjs/passport';
import { JwtModuleOptions } from '@nestjs/jwt';

const jwtSettings = config['jwt'];

export const jwtDefaultStrategy: IAuthModuleOptions = {
  defaultStrategy: jwtSettings.defaultStrategy,
};

export const jwtOptionConfig: JwtModuleOptions = {
  secret: jwtSettings.secret,
  signOptions: { expiresIn: jwtSettings.expiresIn },
};

export const tokenDuration: number = jwtSettings.expiresIn;
