import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @Length(8,8)
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

    @IsInt()
    @IsPositive()
    residenceId: number
}
