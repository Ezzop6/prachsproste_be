import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Board } from './trullo-board.entity';
import { UUID } from 'crypto';
import { Tag } from './trullo-tag.entity';
import { Label } from './trullo-label.entity';

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

  @OneToMany(() => Tag, (tag) => tag.card, { cascade: true, eager: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Label, (color) => color.card, { cascade: true, eager: true })
  @JoinTable()
  labels: Label[];
}
