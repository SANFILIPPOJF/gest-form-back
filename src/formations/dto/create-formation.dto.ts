import { IsDateString, IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateFormationDto {
    @IsDateString()
    date: Date;

    @IsOptional()
    @IsString()
    heure: string;

    @IsPositive()
    @IsInt()
    formTypeId: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    salleId : number
}
