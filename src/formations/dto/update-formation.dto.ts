import { PartialType } from '@nestjs/swagger';
import { CreateFormationDto } from './create-formation.dto';
import { IsOptional } from 'class-validator';

export class UpdateFormationDto extends PartialType(CreateFormationDto) {

    @IsOptional()
    date: Date;

    heure: string;

    @IsOptional()
    formTypeId: number;
}
