import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/typeOrmConfig.config';
import { TrulloModule } from './trullo/trullo.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TrulloModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
