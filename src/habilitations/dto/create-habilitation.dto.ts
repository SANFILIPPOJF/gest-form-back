import { IsDate, IsDateString, IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class CreateHabilitationDto {
    @IsDateString()
    @IsNotEmpty()
    date: Date;
    
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    userId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    formationTypeId: number;
}
