import { IsNotEmpty, IsString } from "class-validator";

export class CreateFormationTypeDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    codeRAF: string

    @IsString()
    @IsNotEmpty()
    duree: string
}
