import { Test, TestingModule } from '@nestjs/testing';
import { HabilitationsService } from './habilitations.service';

describe('HabilitationsService', () => {
  let service: HabilitationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabilitationsService],
    }).compile();

    service = module.get<HabilitationsService>(HabilitationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
