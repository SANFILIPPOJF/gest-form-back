import { IsNotEmpty, IsString, Length } from "class-validator";

export class SignInDto {
    @IsString()
    @Length(8)
    cp: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}