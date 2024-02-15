import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrulloBoardDto } from './dto/create-trullo-board.dto';
import { UpdateTrulloBoardDto } from './dto/update-trullo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trullo } from './entities/trullo.entity';
import { Board } from './entities/trullo-board.entity';
import { Card } from './entities/trullo-card.entity';
import { CreateTrulloCardDto } from './dto/create-trullo-card.dto';

@Injectable()
export class TrulloService {
  constructor(
    @InjectRepository(Trullo)
    private readonly trulloRepository: Repository<Trullo>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,

    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async createBoard(createTrulloDto: CreateTrulloBoardDto): Promise<Board> {
    const board = this.boardRepository.create(createTrulloDto);
    return await this.boardRepository.save(board);
  }

  async createCard(id: string, createTrulloDto: CreateTrulloCardDto): Promise<Card> {
    const board = await this.findOneBoard(id);
    const card = this.cardRepository.create(createTrulloDto);
    board.cards.push(card);
    await this.boardRepository.save(board);
    return card;
  }

  findAllBoards(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['cards'] });
  }

  async findOneBoard(id: string): Promise<Board> {
    const find = await this.boardRepository.findOne({ where: { id }, relations: ['cards'] });
    if (!find) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return find;
  }

  async updateBoard(id: string, updateTrulloDto: UpdateTrulloBoardDto): Promise<Board> {
    const board = await this.findOneBoard(id);
    const updatedBoard = Object.assign(board, updateTrulloDto);
    return await this.boardRepository.save(updatedBoard);
  }

  async deleteBoard(id: string): Promise<HttpStatus> {
    const board = await this.findOneBoard(id);
    await this.cardRepository.remove(board.cards);
    const deleted = await this.boardRepository.remove(board);

    if (!deleted) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return HttpStatus.NO_CONTENT;
  }
}
