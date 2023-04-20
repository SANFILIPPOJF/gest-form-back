import { Module } from '@nestjs/common';
import { HabilitationsService } from './habilitations.service';
import { HabilitationsController } from './habilitations.controller';

@Module({
  controllers: [HabilitationsController],
  providers: [HabilitationsService]
})
export class HabilitationsModule {}
