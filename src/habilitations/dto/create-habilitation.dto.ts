import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class CreateHabilitationDto {
    @IsDateString()
    @IsNotEmpty()
    date: Date;
    @IsNotEmpty()
    userId: number;
    @IsNotEmpty()
    formationTypeId: number;
}
