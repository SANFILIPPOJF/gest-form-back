import { IsNotEmpty, IsString } from "class-validator";

export class FonctionDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
