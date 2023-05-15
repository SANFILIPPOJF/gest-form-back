import { IsInt, IsNotEmpty, IsPositive, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @Length(8,8)
    cp: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    passwordConfirm: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsInt()
    @IsPositive()
    residenceId: number

    @ApiProperty()
    @IsInt()
    @IsPositive()
    fonctionId: number
}

