import { IsInt, IsPositive, isNotEmpty } from 'class-validator';

export class AgentFormationDto {

    @IsInt()
    @IsPositive()
    userId: number;

}
