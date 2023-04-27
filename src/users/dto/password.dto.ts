import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class PasswordDto extends PartialType(CreateUserDto) {

    password: string

    passwordConfirm: string
}
