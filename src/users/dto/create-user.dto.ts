import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(8)
    cp: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    passwordConfirm: string;

    @IsString()
    @IsNotEmpty()
    name: string
}
