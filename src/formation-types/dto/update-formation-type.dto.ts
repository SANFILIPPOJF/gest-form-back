import { PartialType } from '@nestjs/swagger';
import { CreateFormationTypeDto } from './create-formation-type.dto';
import { IsOptional } from 'class-validator';

export class UpdateFormationTypeDto extends PartialType(CreateFormationTypeDto) {

    @IsOptional()
    name: string

    @IsOptional()
    codeRAF: string

    @IsOptional()
    duree: string
}
