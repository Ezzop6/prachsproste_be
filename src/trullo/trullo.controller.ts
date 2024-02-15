import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { CreateTrulloBoardDto } from './dto/create-trullo-board.dto';
import { UpdateTrulloBoardDto } from './dto/update-trullo.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/trullo-board.entity';
import { CreateTrulloCardDto } from './dto/create-trullo-card.dto';
import { Card } from './entities/trullo-card.entity';

@ApiTags('trullo')
@Controller('trullo')
export class TrulloController {
  constructor(private readonly trulloService: TrulloService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Board successfully created.' })
  async createBoard(@Body() createTrulloDto: CreateTrulloBoardDto): Promise<Board> {
    return await this.trulloService.createBoard(createTrulloDto);
  }

  @Post('board/:id')
  @ApiResponse({ status: 201, description: 'Card successfully created.' })
  async createCard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createCardDto: CreateTrulloCardDto,
  ): Promise<Card> {
    return await this.trulloService.createCard(id, createCardDto);
  }

  @Get()
  findAllBoards(): Promise<Board[]> {
    return this.trulloService.findAllBoards();
  }

  @Get(':id')
  findOneBoard(@Param('id', new ParseUUIDPipe()) id: string): Promise<Board> {
    return this.trulloService.findOneBoard(id);
  }

  @Patch(':id')
  async updateBoard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrulloDto: UpdateTrulloBoardDto,
  ): Promise<Board> {
    return await this.trulloService.updateBoard(id, updateTrulloDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Board successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Board not found.' })
  async deleteBoard(@Param('id', new ParseUUIDPipe()) id: string): Promise<HttpStatus> {
    return await this.trulloService.deleteBoard(id);
  }
}
