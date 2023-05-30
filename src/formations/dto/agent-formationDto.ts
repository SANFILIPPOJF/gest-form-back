import { IsInt, IsPositive } from 'class-validator';

export class AgentFormationDto {

    @IsInt()
    @IsPositive()
    userId: number;

}
