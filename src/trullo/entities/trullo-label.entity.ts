import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';
import { Card } from './trullo-card.entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Card, (card) => card.labels)
  card: Card;

  @Column()
  color: string;
}
