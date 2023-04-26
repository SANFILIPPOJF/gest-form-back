import { PartialType } from '@nestjs/swagger';
import { CreateHabilitationDto } from './create-habilitation.dto';
import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateHabilitationDto extends PartialType(CreateHabilitationDto) {
    @IsDate()
    @IsNotEmpty()
    date: Date;
}
