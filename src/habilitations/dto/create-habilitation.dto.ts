import { IsDate, IsNotEmpty } from "class-validator";
import { FormationType } from "src/formation-types/entities/formation-type.entity";
import { User } from "src/users/entities/user.entity";

export class CreateHabilitationDto {
    @IsDate()
    date: Date;
    @IsNotEmpty()
    user: User;
    @IsNotEmpty()
    formationType: FormationType;
}
