import { Test, TestingModule } from '@nestjs/testing';
import { UserAreaService } from './user-area.service';

describe('UserAreaService', () => {
  let service: UserAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAreaService],
    }).compile();

    service = module.get<UserAreaService>(UserAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
