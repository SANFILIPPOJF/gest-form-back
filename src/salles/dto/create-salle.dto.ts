import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSalleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    adresse: string;

    @IsInt()
    capacite: number;
}
