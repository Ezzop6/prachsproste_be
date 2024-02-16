import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrulloCardDto {
  @ApiProperty({ example: 'My first card' })
  @IsNotEmpty()
  @IsString()
  item: string;
}
