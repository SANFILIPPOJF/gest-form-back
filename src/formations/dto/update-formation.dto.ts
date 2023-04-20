import { PartialType } from '@nestjs/swagger';
import { CreateFormationDto } from './create-formation.dto';
import { IsDate } from 'class-validator';

export class UpdateFormationDto extends PartialType(CreateFormationDto) {
    @IsDate()
    date: Date;
    status: number;
    motifAnnulation: string;
}
