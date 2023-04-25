import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateFormationDto {
    @IsDate()
    date: Date;

    @IsOptional()
    @IsString()
    heure: string;
}
