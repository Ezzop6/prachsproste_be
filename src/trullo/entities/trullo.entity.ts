import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board } from './trullo-board.entity';
import { UUID } from 'crypto';

@Entity()
export class Trullo {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @OneToMany(() => Board, (board) => board.trullo, { cascade: true })
  boards: Board[];
}
