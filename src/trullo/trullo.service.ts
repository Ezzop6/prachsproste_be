import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrulloBoardDto } from './dto/create-trullo-board.dto';
import { UpdateTrulloBoardDto } from './dto/update-trullo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trullo } from './entities/trullo.entity';
import { Board } from './entities/trullo-board.entity';
import { Card } from './entities/trullo-card.entity';
import { CreateTrulloCardDto } from './dto/create-trullo-card.dto';
import { UpdateTrulloCardDto } from './dto/update-trullo-card.dto';
import { UUID } from 'crypto';
import { Tag } from './entities/trullo-tag.entity';
import { Label } from './entities/trullo-label.entity';
import { CreateTrulloTagDto } from './dto/create-trullo-tag.dto';
import { CreateTrulloLabelDto } from './dto/create-trullo-label.dto';
import { UpdateTrulloTagDto } from './dto/update-trullotag.dto';
import { UpdateTrulloLabelDto } from './dto/update-trullo-label.dto';

@Injectable()
export class TrulloService {
  constructor(
    @InjectRepository(Trullo)
    private readonly trulloRepository: Repository<Trullo>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

    @InjectRepository(Label)
    private readonly colorRepository: Repository<Label>,
  ) {}

  // CREATE METHODS

  async createBoard(createTrulloDto: CreateTrulloBoardDto): Promise<Board> {
    const board = this.boardRepository.create(createTrulloDto);
    return await this.boardRepository.save(board);
  }

  async createCard(id: UUID, createTrulloDto: CreateTrulloCardDto): Promise<Card> {
    const board = await this.findOneBoard(id);
    const card = this.cardRepository.create(createTrulloDto);
    card.board = board;
    await this.cardRepository.save(card);
    delete card.board;
    return card;
  }

  async createTag(id: UUID, dto: CreateTrulloTagDto): Promise<Tag> {
    const card = await this.findOneCard(id);
    const newTag = new Tag();
    newTag.text = dto.text;
    newTag.card = card;
    await this.tagRepository.save(newTag);
    return this.tagRepository.findOne({ where: { id: newTag.id } });
  }

  async createLabel(id: UUID, dto: CreateTrulloLabelDto): Promise<Label> {
    const card = await this.findOneCard(id);
    const newLabel = new Label();
    newLabel.color = dto.color;
    newLabel.card = card;
    await this.colorRepository.save(newLabel);
    return this.colorRepository.findOne({ where: { id: newLabel.id } });
  }
  // READ METHODS

  async findAllBoards(): Promise<Board[]> {
    const boards = await this.boardRepository.find({ relations: ['cards'] });
    const sortedBoards = this.sortBoardByDate(boards);
    const sortedCards = sortedBoards.map((board) => this.sortCardByDate(board.cards));
    return sortedBoards.map((board, index) => ({ ...board, cards: sortedCards[index] }));
  }

  async findOneBoard(id: UUID): Promise<Board> {
    const find = await this.boardRepository.findOne({ where: { id }, relations: ['cards'] });
    if (!find) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    const sortedCards = this.sortCardByDate(find.cards);
    return { ...find, cards: sortedCards };
  }

  async findOneTag(id: UUID): Promise<Tag> {
    const find = await this.tagRepository.findOne({ where: { id } });
    if (!find) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    return find;
  }
  async findOneLabel(id: UUID): Promise<Label> {
    const find = await this.colorRepository.findOne({ where: { id } });
    if (!find) {
      throw new NotFoundException(`Label with id ${id} not found`);
    }
    return find;
  }

  async findOneCard(id: UUID): Promise<Card> {
    const find = await this.cardRepository.findOne({ where: { id } });
    if (!find) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return find;
  }

  // UPDATE METHODS

  async updateBoard(id: UUID, updateTrulloBoardDto: UpdateTrulloBoardDto): Promise<Board> {
    const board = await this.findOneBoard(id);
    const updatedBoard = Object.assign(board, updateTrulloBoardDto);
    return await this.boardRepository.save(updatedBoard);
  }

  async updateCard(id: UUID, updateTrulloDto: UpdateTrulloCardDto): Promise<Card> {
    const card = await this.findOneCard(id);
    const updatedCard = Object.assign(card, updateTrulloDto);
    return await this.cardRepository.save(updatedCard);
  }

  async updateTag(id: UUID, dto: UpdateTrulloTagDto): Promise<Tag> {
    const tag = await this.findOneTag(id);
    const updatedTag = Object.assign(tag, dto);
    return await this.tagRepository.save(updatedTag);
  }
  async updateLabel(id: UUID, dto: UpdateTrulloLabelDto): Promise<Label> {
    const label = await this.findOneLabel(id);
    const updatedLabel = Object.assign(label, dto);
    return await this.colorRepository.save(updatedLabel);
  }

  // DELETE METHODS

  async deleteBoard(id: UUID): Promise<HttpStatus> {
    const board = await this.findOneBoard(id);
    const cards = await this.cardRepository.find({ where: { board: { id } } });
    const tags = await this.tagRepository.find({ where: { card: { board: { id } } } });
    const labels = await this.colorRepository.find({ where: { card: { board: { id } } } });

    await this.tagRepository.remove(tags);
    await this.colorRepository.remove(labels);
    await this.cardRepository.remove(cards);

    const deleted = await this.boardRepository.remove(board);

    if (!deleted) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }

  async deleteCard(id: UUID): Promise<HttpStatus> {
    const card = await this.findOneCard(id);
    const tags = await this.tagRepository.find({ where: { card: { id } } });
    const labels = await this.colorRepository.find({ where: { card: { id } } });

    await this.tagRepository.remove(tags);
    await this.colorRepository.remove(labels);

    const deleted = await this.cardRepository.remove(card);

    if (!deleted) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }

  async deleteTag(id: UUID): Promise<HttpStatus> {
    const tag = await this.findOneTag(id);
    const deleted = await this.tagRepository.remove(tag);

    if (!deleted) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }

  async deleteLabel(id: UUID): Promise<HttpStatus> {
    const label = await this.findOneLabel(id);
    const deleted = await this.colorRepository.remove(label);

    if (!deleted) {
      throw new NotFoundException(`Label with id ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }

  // TODO: Delete after testing
  async deleteAllBoards(): Promise<HttpStatus> {
    const boards = await this.findAllBoards();
    for (const board of boards) {
      await this.deleteBoard(board.id);
    }
    return HttpStatus.NO_CONTENT;
  }

  // UTILS

  sortBoardByDate(boards: Board[], ascending: boolean = true): Board[] {
    return boards.sort((a, b) => {
      if (ascending) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
  sortCardByDate(cards: Card[], ascending: boolean = true): Card[] {
    return cards.sort((a, b) => {
      if (ascending) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
}
