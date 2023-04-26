import { Module } from '@nestjs/common';
import { ResidencesService } from './residences.service';
import { ResidencesController } from './residences.controller';

@Module({
  controllers: [ResidencesController],
  providers: [ResidencesService],
  exports: [ResidencesService]
})
export class ResidencesModule {}
