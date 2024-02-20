import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { Board } from './trullo-board.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Board, (board) => board.tags)
  board: Board;

  @Column()
  text: string;
}
