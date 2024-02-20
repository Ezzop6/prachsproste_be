import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTrulloCardDto } from './create-trullo-card.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateTrulloCardDto extends PartialType(CreateTrulloCardDto) {
  @ApiProperty({ example: ['My first tag'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: ['My first label'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
