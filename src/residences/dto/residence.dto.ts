import { IsNotEmpty, IsString } from "class-validator";

export class ResidenceDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
