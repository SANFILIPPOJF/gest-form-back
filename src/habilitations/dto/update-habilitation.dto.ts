import {  IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateHabilitationDto {
    @IsDateString()
    @IsNotEmpty()
    date: Date;
}
