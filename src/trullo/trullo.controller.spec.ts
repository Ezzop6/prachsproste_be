import { Test, TestingModule } from '@nestjs/testing';
import { TrulloController } from './trullo.controller';
import { TrulloService } from './trullo.service';

describe('TrulloController', () => {
  let controller: TrulloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrulloController],
      providers: [TrulloService],
    }).compile();

    controller = module.get<TrulloController>(TrulloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
