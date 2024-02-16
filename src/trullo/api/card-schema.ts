import { ApiProperty } from '@nestjs/swagger';

export class SchemaCard {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  item: string;
}
