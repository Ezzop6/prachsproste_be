import { PartialType } from '@nestjs/swagger';
import { CreateTrulloBoardDto } from './create-trullo-board.dto';

export class UpdateTrulloBoardDto extends PartialType(CreateTrulloBoardDto) {}
