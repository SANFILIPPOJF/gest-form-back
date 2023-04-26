import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateSalleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    adresse: string;

    @IsPositive()
    @IsInt()
    capacite: number;
}
