import { IsDate } from "class-validator";

export class CreateFormationDto {
    @IsDate()
    date: Date;
}
