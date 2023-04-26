import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ResidencesService } from 'src/residences/residences.service';
import { FonctionsService } from 'src/fonctions/fonctions.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,ResidencesService,FonctionsService],
  exports: [UsersService]
})
export class UsersModule {}
