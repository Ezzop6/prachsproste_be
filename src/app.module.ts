import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeOrmConfig.config';
import { TrulloModule } from './trullo/trullo.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { rateLimiterConfig } from 'config/rateLimiterConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TrulloModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [rateLimiterConfig],
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
