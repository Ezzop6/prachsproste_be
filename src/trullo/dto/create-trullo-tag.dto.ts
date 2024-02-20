import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrulloTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}
