import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Card } from './trullo-card.entity';
import { Trullo } from './trullo.entity';
import { UUID } from 'crypto';
import { Tag } from './trullo-tag.entity';
import { Color } from './trullo-color.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Trullo, (trullo) => trullo.boards)
  trullo: Trullo;

  @OneToMany(() => Card, (card) => card.board, { cascade: true })
  cards: Card[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  title: string;

  @OneToMany(() => Tag, (tag) => tag.board, { cascade: true, eager: true })
  tags: Tag[];

  @OneToMany(() => Color, (color) => color.board, { cascade: true, eager: true })
  colors: Color[];
}
