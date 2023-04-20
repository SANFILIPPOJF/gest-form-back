import { PartialType } from '@nestjs/swagger';
import { CreateFormationTypeDto } from './create-formation-type.dto';

export class UpdateFormationTypeDto extends PartialType(CreateFormationTypeDto) {}
