import { Module } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { TrulloController } from './trullo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trullo } from './entities/trullo.entity';
import { Board } from './entities/trullo-board.entity';
import { Card } from './entities/trullo-card.entity';
import { Tag } from './entities/trullo-tag.entity';
import { Color } from './entities/trullo-color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trullo, Board, Card, Tag, Color])],
  controllers: [TrulloController],
  providers: [TrulloService],
})
export class TrulloModule {}
