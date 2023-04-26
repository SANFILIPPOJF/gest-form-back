import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateFormationDto {
    @IsDateString()
    date: Date;

    @IsOptional()
    @IsString()
    heure: string;
}
