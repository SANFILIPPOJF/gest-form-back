import { Module } from '@nestjs/common';
import { FormationTypesService } from './formation-types.service';
import { FormationTypesController } from './formation-types.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [FormationTypesController],
  providers: [FormationTypesService,UsersService],
  exports: [FormationTypesService]
})
export class FormationTypesModule {}
