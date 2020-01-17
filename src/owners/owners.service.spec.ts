import { Test, TestingModule } from '@nestjs/testing';
import { OwnersService } from './owners.service';

describe('CarsService', () => {
  let service: OwnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnersService],
    }).compile();

    service = module.get<OwnersService>(OwnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
