import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    password: string;

    @IsOptional()
    passwordConfirm: string;

    @IsOptional()
    name: string

    @IsOptional()
    residenceId: number

    @IsOptional()
    fonctionId: number
}
