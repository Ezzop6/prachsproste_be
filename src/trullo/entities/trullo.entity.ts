import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board } from './trullo-board.entity';

@Entity()
export class Trullo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Board, (board) => board.trullo, { cascade: true })
  boards: Board[];
}
