import { Injectable } from '@nestjs/common';
import { CreateTrulloDto } from './dto/create-trullo.dto';
import { UpdateTrulloDto } from './dto/update-trullo.dto';

@Injectable()
export class TrulloService {
  create(createTrulloDto: CreateTrulloDto) {
    return 'This action adds a new trullo';
  }

  findAll() {
    return `This action returns all trullo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trullo`;
  }

  update(id: number, updateTrulloDto: UpdateTrulloDto) {
    return `This action updates a #${id} trullo`;
  }

  remove(id: number) {
    return `This action removes a #${id} trullo`;
  }
}
