import { IsNotEmpty, IsString } from 'class-validator';

export class CancelFormationDto {

    @IsString()
    @IsNotEmpty()
    motifAnnulation: string;

}
