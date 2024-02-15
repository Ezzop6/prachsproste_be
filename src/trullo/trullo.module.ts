import { Module } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { TrulloController } from './trullo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trullo } from './entities/trullo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trullo])],
  controllers: [TrulloController],
  providers: [TrulloService],
})
export class TrulloModule {}
