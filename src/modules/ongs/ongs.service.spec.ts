import { Test, TestingModule } from '@nestjs/testing';
import { OngsService } from './ongs.service';

describe('OngsService', () => {
  let service: OngsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OngsService],
    }).compile();

    service = module.get<OngsService>(OngsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
