import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrulloBoardDto {
  @ApiProperty({ example: 'My first board' })
  @IsNotEmpty()
  title: string;
}
