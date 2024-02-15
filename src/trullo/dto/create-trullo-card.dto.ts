import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTrulloCardDto {
  @ApiProperty()
  @IsNotEmpty()
  item: string;
}
