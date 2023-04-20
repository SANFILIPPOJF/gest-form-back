import { PartialType } from '@nestjs/swagger';
import { CreateHabilitationDto } from './create-habilitation.dto';

export class UpdateHabilitationDto extends PartialType(CreateHabilitationDto) {}
