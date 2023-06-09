import { PartialType } from '@nestjs/swagger';
import { CreateSalleDto } from './create-salle.dto';
import { IsOptional } from 'class-validator';

export class UpdateSalleDto extends PartialType(CreateSalleDto) {
    
    @IsOptional()
    name: string;

    @IsOptional()
    adresse: string;
    
    @IsOptional()
    capacite: number;
}
