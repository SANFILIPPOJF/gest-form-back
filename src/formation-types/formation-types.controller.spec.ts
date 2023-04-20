import { Test, TestingModule } from '@nestjs/testing';
import { FormationTypesController } from './formation-types.controller';
import { FormationTypesService } from './formation-types.service';

describe('FormationTypesController', () => {
  let controller: FormationTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationTypesController],
      providers: [FormationTypesService],
    }).compile();

    controller = module.get<FormationTypesController>(FormationTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
