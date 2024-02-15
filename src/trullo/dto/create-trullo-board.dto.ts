import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrulloBoardDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
