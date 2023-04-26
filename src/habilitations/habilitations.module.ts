import { Module } from '@nestjs/common';
import { HabilitationsService } from './habilitations.service';
import { HabilitationsController } from './habilitations.controller';
import { UsersService } from 'src/users/users.service';
import { FormationTypesService } from 'src/formation-types/formation-types.service';

@Module({
  controllers: [HabilitationsController],
  providers: [HabilitationsService,UsersService,FormationTypesService]
})
export class HabilitationsModule {}
