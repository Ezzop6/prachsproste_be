import { PartialType } from '@nestjs/swagger';
import { CreateTrulloCardDto } from './create-trullo-card.dto';

export class UpdateTrulloCardDto extends PartialType(CreateTrulloCardDto) {}
