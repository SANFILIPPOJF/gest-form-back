import { PartialType } from '@nestjs/swagger';
import { CreateFormationDto } from './create-formation.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateFormationDto extends PartialType(CreateFormationDto) {

    @IsOptional()
    @IsDateString()
    date: Date;

    @IsOptional()
    @IsString()
    heure: string;

}
