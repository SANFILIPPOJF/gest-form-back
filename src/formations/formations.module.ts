import { Module } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { FormationsController } from './formations.controller';
import { FormationTypesService } from 'src/formation-types/formation-types.service';
import { SallesService } from 'src/salles/salles.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [FormationsController],
  providers: [FormationsService,FormationTypesService,SallesService,UsersService]
})
export class FormationsModule {}
