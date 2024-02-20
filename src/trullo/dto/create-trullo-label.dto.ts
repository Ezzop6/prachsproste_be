import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrulloLabelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;
}
