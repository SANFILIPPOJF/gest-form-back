import { Test, TestingModule } from '@nestjs/testing';
import { ResidencesController } from './residences.controller';
import { ResidencesService } from './residences.service';

describe('ResidencesController', () => {
  let controller: ResidencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidencesController],
      providers: [ResidencesService],
    }).compile();

    controller = module.get<ResidencesController>(ResidencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
