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
import { Color } from './entities/trullo-color.entity';

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

    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
  ) {}

  async createBoard(createTrulloDto: CreateTrulloBoardDto): Promise<Board> {
    const board = this.boardRepository.create(createTrulloDto);
    return await this.boardRepository.save(board);
  }

  async createCard(id: UUID, createTrulloDto: CreateTrulloCardDto): Promise<Card> {
    const board = await this.findOneBoard(id);
    const card = this.cardRepository.create(createTrulloDto);
    board.cards.push(card);
    await this.boardRepository.save(board);
    return card;
  }

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

  async findOneCard(id: UUID): Promise<Card> {
    const find = await this.cardRepository.findOne({ where: { id } });
    if (!find) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return find;
  }

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

  async deleteBoard(id: UUID): Promise<HttpStatus> {
    const board = await this.findOneBoard(id);
    await this.cardRepository.remove(board.cards);
    const deleted = await this.boardRepository.remove(board);

    if (!deleted) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }
  async deleteCard(id: UUID): Promise<HttpStatus> {
    const card = await this.findOneCard(id);
    const deleted = await this.cardRepository.remove(card);

    if (!deleted) {
      throw new NotFoundException(`Card with id ${id} not found`);
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
