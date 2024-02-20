import { PartialType } from '@nestjs/swagger';
import { CreateTrulloTagDto } from './create-trullo-tag.dto';

export class UpdateTrulloTagDto extends PartialType(CreateTrulloTagDto) {}
