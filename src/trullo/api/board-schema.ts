import { ApiProperty } from '@nestjs/swagger';
import { SchemaCard } from './card-schema';

export class SchemaBoard {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: SchemaCard, isArray: true })
  cards: SchemaCard[];
}

export class SchemaBoardEmpty {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  createdAt: Date;
}
