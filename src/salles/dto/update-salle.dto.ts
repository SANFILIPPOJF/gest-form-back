import { PartialType } from '@nestjs/swagger';
import { CreateSalleDto } from './create-salle.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateSalleDto extends PartialType(CreateSalleDto) {
    @IsString()
    name: string;

    @IsString()
    adresse: string;
    
    @IsInt()
    capacite: number;
}
