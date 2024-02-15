import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrulloService } from './trullo.service';
import { CreateTrulloDto } from './dto/create-trullo.dto';
import { UpdateTrulloDto } from './dto/update-trullo.dto';

@Controller('trullo')
export class TrulloController {
  constructor(private readonly trulloService: TrulloService) {}

  @Post()
  create(@Body() createTrulloDto: CreateTrulloDto) {
    return this.trulloService.create(createTrulloDto);
  }

  @Get()
  findAll() {
    return this.trulloService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trulloService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrulloDto: UpdateTrulloDto) {
    return this.trulloService.update(+id, updateTrulloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trulloService.remove(+id);
  }
}
