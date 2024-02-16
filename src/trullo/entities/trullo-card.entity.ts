import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from './trullo-board.entity';
import { UUID } from 'crypto';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Board, (board) => board.cards)
  board: Board;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  item: string;
}
