import { PartialType } from '@nestjs/swagger';
import { CreateTrulloDto } from './create-trullo.dto';

export class UpdateTrulloDto extends PartialType(CreateTrulloDto) {}
