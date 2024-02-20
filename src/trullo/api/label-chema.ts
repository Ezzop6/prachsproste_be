import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class LabelSchema {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  color: string;
}
