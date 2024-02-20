import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { Card } from './trullo-card.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Card, (card) => card.tags)
  card: Card;

  @Column()
  text: string;
}
