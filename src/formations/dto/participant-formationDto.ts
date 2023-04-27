import { IsInt, IsPositive, isNotEmpty } from 'class-validator';

export class ParticipantFormationDto {

    @IsInt()
    @IsPositive()
    userId: number;

}
