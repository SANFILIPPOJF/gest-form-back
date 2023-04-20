import { Test, TestingModule } from '@nestjs/testing';
import { HabilitationsController } from './habilitations.controller';
import { HabilitationsService } from './habilitations.service';

describe('HabilitationsController', () => {
  let controller: HabilitationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabilitationsController],
      providers: [HabilitationsService],
    }).compile();

    controller = module.get<HabilitationsController>(HabilitationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
