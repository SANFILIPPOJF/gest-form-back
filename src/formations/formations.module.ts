import { Module } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { FormationTypesService } from 'src/formation-types/formation-types.service';

@Module({
  controllers: [FormationsController],
  providers: [FormationsService,FormationTypesService]
})
export class FormationsModule {}
