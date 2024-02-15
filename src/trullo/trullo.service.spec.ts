import { Test, TestingModule } from '@nestjs/testing';
import { TrulloService } from './trullo.service';

describe('TrulloService', () => {
  let service: TrulloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrulloService],
    }).compile();

    service = module.get<TrulloService>(TrulloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
