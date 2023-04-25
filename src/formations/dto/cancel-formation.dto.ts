import { PartialType } from '@nestjs/swagger';
import { CreateFormationDto } from './create-formation.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelFormationDto {

    @IsString()
    @IsNotEmpty()
    motifAnnulation: string;

}
