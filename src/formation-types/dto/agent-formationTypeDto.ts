import { IsInt, IsPositive } from 'class-validator';

export class AgentFormationTypeDto {

    @IsInt()
    @IsPositive()
    userId: number;

}
