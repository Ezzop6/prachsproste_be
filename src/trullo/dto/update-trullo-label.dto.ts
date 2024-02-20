import { PartialType } from '@nestjs/swagger';
import { CreateTrulloLabelDto } from './create-trullo-label.dto';

export class UpdateTrulloLabelDto extends PartialType(CreateTrulloLabelDto) {}
