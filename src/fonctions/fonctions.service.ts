import { Injectable } from '@nestjs/common';
import { CreateFonctionDto } from './dto/create-fonction.dto';
import { UpdateFonctionDto } from './dto/update-fonction.dto';

@Injectable()
export class FonctionsService {
  create(createFonctionDto: CreateFonctionDto) {
    return 'This action adds a new fonction';
  }

  findAll() {
    return `This action returns all fonctions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fonction`;
  }

  update(id: number, updateFonctionDto: UpdateFonctionDto) {
    return `This action updates a #${id} fonction`;
  }

  remove(id: number) {
    return `This action removes a #${id} fonction`;
  }
}
