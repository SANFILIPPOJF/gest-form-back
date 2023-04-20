import { PartialType } from '@nestjs/swagger';
import { CreateHabilitationDto } from './create-habilitation.dto';
import { IsDate } from 'class-validator';

export class UpdateHabilitationDto extends PartialType(CreateHabilitationDto) {
    @IsDate()
    date: Date;
}
