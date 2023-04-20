import { Injectable } from '@nestjs/common';
import { CreateFormationTypeDto } from './dto/create-formation-type.dto';
import { UpdateFormationTypeDto } from './dto/update-formation-type.dto';

@Injectable()
export class FormationTypesService {
  create(createFormationTypeDto: CreateFormationTypeDto) {
    return 'This action adds a new formationType';
  }

  findAll() {
    return `This action returns all formationTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formationType`;
  }

  update(id: number, updateFormationTypeDto: UpdateFormationTypeDto) {
    return `This action updates a #${id} formationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} formationType`;
  }
}
