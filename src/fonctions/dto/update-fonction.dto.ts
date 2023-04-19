import { PartialType } from '@nestjs/swagger';
import { CreateFonctionDto } from './create-fonction.dto';

export class UpdateFonctionDto extends PartialType(CreateFonctionDto) {}
