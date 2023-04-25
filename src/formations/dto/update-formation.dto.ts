import { PartialType } from '@nestjs/swagger';
import { CreateFormationDto } from './create-formation.dto';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateFormationDto extends PartialType(CreateFormationDto) {

    @IsOptional()
    @IsDate()
    date: Date;

    @IsOptional()
    @IsString()
    heure: string;

}
