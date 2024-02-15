import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrulloCardDto {
  @ApiProperty({ example: 'My first card' })
  @IsNotEmpty()
  item: string;
}
