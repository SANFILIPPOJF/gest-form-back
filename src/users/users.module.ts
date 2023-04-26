import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ResidencesService } from 'src/residences/residences.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,ResidencesService],
  exports: [UsersService]
})
export class UsersModule {}
