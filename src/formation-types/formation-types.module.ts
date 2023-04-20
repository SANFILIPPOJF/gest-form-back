import { Module } from '@nestjs/common';
import { FormationTypesService } from './formation-types.service';
import { FormationTypesController } from './formation-types.controller';

@Module({
  controllers: [FormationTypesController],
  providers: [FormationTypesService]
})
export class FormationTypesModule {}
