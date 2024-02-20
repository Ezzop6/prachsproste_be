import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { CreateTrulloBoardDto } from './dto/create-trullo-board.dto';
import { UpdateTrulloBoardDto } from './dto/update-trullo.dto';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/trullo-board.entity';
import { CreateTrulloCardDto } from './dto/create-trullo-card.dto';
import { Card } from './entities/trullo-card.entity';
import { UpdateTrulloCardDto } from './dto/update-trullo-card.dto';
import { UUID } from 'crypto';
import { SchemaBoard, SchemaBoardEmpty } from './api/board-schema';
import { SchemaCard } from './api/card-schema';
import { TagSchema } from './api/tag-schema';
import { CreateTrulloTagDto } from './dto/create-trullo-tag.dto';
import { Tag } from './entities/trullo-tag.entity';
import { Label } from './entities/trullo-label.entity';
import { CreateTrulloLabelDto } from './dto/create-trullo-label.dto';
import { UpdateTrulloTagDto } from './dto/update-trullotag.dto';
import { UpdateTrulloLabelDto } from './dto/update-trullo-label.dto';

@ApiTags('trullo')
@Controller('trullo')
export class TrulloController {
  constructor(private readonly trulloService: TrulloService) {}

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  @ApiCreatedResponse({ type: SchemaBoard, isArray: true })
  async findAllBoards(): Promise<Board[]> {
    return await this.trulloService.findAllBoards();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 201, description: 'There is no card yet.', type: SchemaBoardEmpty })
  async createBoard(@Body() createTrulloDto: CreateTrulloBoardDto): Promise<Board> {
    return await this.trulloService.createBoard(createTrulloDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a board by id' })
  @ApiResponse({ status: 200, description: 'Board successfully found.', type: SchemaBoard })
  async findOneBoard(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<Board> {
    return await this.trulloService.findOneBoard(id);
  }

  @Get('tag/:id')
  @ApiOperation({ summary: 'Get a tag by id' })
  @ApiResponse({ status: 200, description: 'Tag successfully found.', type: TagSchema })
  async findOneTag(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<Tag> {
    return await this.trulloService.findOneTag(id);
  }
  @Get('label/:id')
  @ApiOperation({ summary: 'Get a label by id' })
  @ApiResponse({ status: 200, description: 'Label successfully found.' })
  async findOneLabel(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<Label> {
    return await this.trulloService.findOneLabel(id);
  }

  @Get('card/:id')
  @ApiOperation({ summary: 'Get a card by id' })
  @ApiResponse({ status: 200, description: 'Card successfully found.', type: SchemaCard })
  async findOneCard(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<Card> {
    return await this.trulloService.findOneCard(id);
  }

  @Post('board/:id')
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({ status: 201, description: 'Card successfully created.', type: SchemaCard })
  async createCard(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() createCardDto: CreateTrulloCardDto,
  ): Promise<Card> {
    return await this.trulloService.createCard(id, createCardDto);
  }
  @Post('tag/:id/')
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiResponse({ status: 201, description: 'Tag successfully created.', type: TagSchema })
  async createTag(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() dto: CreateTrulloTagDto): Promise<Tag> {
    return await this.trulloService.createTag(id, dto);
  }
  @Post('label/:id/')
  @ApiOperation({ summary: 'Create a new label' })
  @ApiResponse({ status: 201, description: 'Label successfully created.' })
  async createLabel(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() dto: CreateTrulloLabelDto): Promise<Label> {
    return await this.trulloService.createLabel(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a board' })
  @ApiResponse({ status: 200, description: 'Board successfully updated.', type: SchemaBoard })
  @ApiResponse({ status: 404, description: 'Board not found.' })
  async updateBoard(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateTrulloBoardDto: UpdateTrulloBoardDto,
  ): Promise<Board> {
    return await this.trulloService.updateBoard(id, updateTrulloBoardDto);
  }

  @Patch('card/:id')
  @ApiOperation({ summary: 'Update a card' })
  @ApiResponse({ status: 200, description: 'Card successfully updated.', type: SchemaCard })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async updateCard(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateTrulloCardDto: UpdateTrulloCardDto,
  ): Promise<Card> {
    return await this.trulloService.updateCard(id, updateTrulloCardDto);
  }

  @Patch('tag/:id')
  @ApiOperation({ summary: 'Update a tag' })
  @ApiResponse({ status: 200, description: 'Tag successfully updated.', type: TagSchema })
  @ApiResponse({ status: 404, description: 'Tag not found.' })
  async updateTag(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() dto: UpdateTrulloTagDto): Promise<Tag> {
    return await this.trulloService.updateTag(id, dto);
  }
  @Patch('label/:id')
  @ApiOperation({ summary: 'Update a label' })
  @ApiResponse({ status: 200, description: 'Label successfully updated.' })
  @ApiResponse({ status: 404, description: 'Label not found.' })
  async updateLabel(@Param('id', new ParseUUIDPipe()) id: UUID, @Body() dto: UpdateTrulloLabelDto): Promise<Label> {
    return await this.trulloService.updateLabel(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board with all cards' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Board successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Board not found.' })
  async deleteBoard(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<HttpStatus> {
    return await this.trulloService.deleteBoard(id);
  }

  @Delete('card/:id')
  @ApiOperation({ summary: 'Delete a card' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Card successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Card not found.' })
  async deleteCard(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<HttpStatus> {
    return await this.trulloService.deleteCard(id);
  }

  @Delete('tag/:id')
  @ApiOperation({ summary: 'Delete a tag' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Tag successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tag not found.' })
  async deleteTag(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<HttpStatus> {
    return await this.trulloService.deleteTag(id);
  }

  @Delete('label/:id')
  @ApiOperation({ summary: 'Delete a label' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'Label successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Label not found.' })
  async deleteLabel(@Param('id', new ParseUUIDPipe()) id: UUID): Promise<HttpStatus> {
    return await this.trulloService.deleteLabel(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all boards only for testing' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'All boards successfully deleted.' })
  async deleteAllBoards(): Promise<HttpStatus> {
    return await this.trulloService.deleteAllBoards();
  }
}
