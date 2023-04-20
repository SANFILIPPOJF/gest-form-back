import { Test, TestingModule } from '@nestjs/testing';
import { FormationTypesService } from './formation-types.service';

describe('FormationTypesService', () => {
  let service: FormationTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormationTypesService],
    }).compile();

    service = module.get<FormationTypesService>(FormationTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
