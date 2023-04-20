import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSalleDto {
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsString()
    @IsNotEmpty()
    adresse: String;

    @IsInt()
    capacite: number;
}
