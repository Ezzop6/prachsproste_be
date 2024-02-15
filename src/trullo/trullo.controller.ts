import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { CreateTrulloBoardDto } from './dto/create-trullo-board.dto';
import { UpdateTrulloBoardDto } from './dto/update-trullo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/trullo-board.entity';
import { CreateTrulloCardDto } from './dto/create-trullo-card.dto';
import { Card } from './entities/trullo-card.entity';
import { UpdateTrulloCardDto } from './dto/update-trullo-card.dto';

@ApiTags('trullo')
@Controller('trullo')
export class TrulloController {
  constructor(private readonly trulloService: TrulloService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all boards',
  })
  async findAllBoards(): Promise<Board[]> {
    return await this.trulloService.findAllBoards();
  }

  @Post()
  @ApiOperation({
    summary: 'Board successfully created.',
  })
  @ApiResponse({ status: 201, description: 'Board successfully created.' })
  async createBoard(@Body() createTrulloDto: CreateTrulloBoardDto): Promise<Board> {
    return await this.trulloService.createBoard(createTrulloDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a board by id',
  })
  async findOneBoard(@Param('id', new ParseUUIDPipe()) id: string): Promise<Board> {
    return await this.trulloService.findOneBoard(id);
  }

  @Get('card/:id')
  @ApiOperation({
    summary: 'Get a card by id',
  })
  async findOneCard(@Param('id', new ParseUUIDPipe()) id: string): Promise<Card> {
    return await this.trulloService.findOneCard(id);
  }

  @Post('board/:id')
  @ApiOperation({
    summary: 'Create a new card',
  })
  @ApiResponse({ status: 201, description: 'Card successfully created.' })
  async createCard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createCardDto: CreateTrulloCardDto,
  ): Promise<Card> {
    return await this.trulloService.createCard(id, createCardDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a board',
  })
  @ApiResponse({ status: 200, description: 'Board successfully updated.' })
  @ApiResponse({ status: 404, description: 'Board not found.' })
  async updateBoard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrulloBoardDto: UpdateTrulloBoardDto,
  ): Promise<Board> {
    return await this.trulloService.updateBoard(id, updateTrulloBoardDto);
  }

  @Patch('card/:id')
  @ApiOperation({
    summary: 'Update a card',
  })
  @ApiResponse({ status: 200, description: 'Card successfully updated.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async updateCard(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrulloCardDto: UpdateTrulloCardDto,
  ): Promise<Card> {
    return await this.trulloService.updateCard(id, updateTrulloCardDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a board with all cards',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Board successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Board not found.' })
  async deleteBoard(@Param('id', new ParseUUIDPipe()) id: string): Promise<HttpStatus> {
    return await this.trulloService.deleteBoard(id);
  }

  @Delete('card/:id')
  @ApiOperation({
    summary: 'Delete a card',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Card successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async deleteCard(@Param('id', new ParseUUIDPipe()) id: string): Promise<HttpStatus> {
    return await this.trulloService.deleteCard(id);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete all boards only for testing',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'All boards successfully deleted.' })
  async deleteAllBoards(): Promise<HttpStatus> {
    return await this.trulloService.deleteAllBoards();
  }
}
