import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { Board } from './trullo-board.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Board, (board) => board.colors)
  board: Board;

  @Column()
  color: string;
}
