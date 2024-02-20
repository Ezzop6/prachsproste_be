import { Module } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { TrulloController } from './trullo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trullo } from './entities/trullo.entity';
import { Board } from './entities/trullo-board.entity';
import { Card } from './entities/trullo-card.entity';
import { Tag } from './entities/trullo-tag.entity';
import { Label } from './entities/trullo-label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trullo, Board, Card, Tag, Label])],
  controllers: [TrulloController],
  providers: [TrulloService],
})
export class TrulloModule {}
