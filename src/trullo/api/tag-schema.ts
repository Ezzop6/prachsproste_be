import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class TagSchema {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  text: string;
}
