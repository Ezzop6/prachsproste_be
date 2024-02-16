import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrulloBoardDto {
  @ApiProperty({ example: 'My first board' })
  @IsNotEmpty()
  @IsString()
  title: string;
}
