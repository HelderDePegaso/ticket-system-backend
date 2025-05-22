import { Test, TestingModule } from '@nestjs/testing';
import { AssistentService } from './assistent.service';

describe('AssistentService', () => {
  let service: AssistentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssistentService],
    }).compile();

    service = module.get<AssistentService>(AssistentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
