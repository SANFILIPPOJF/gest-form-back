import { Injectable } from '@nestjs/common';
import { FonctionDto } from './dto/fonction.dto';


@Injectable()
export class FonctionsService {
  create(FonctionDto: FonctionDto) {
    return 'This action adds a new fonction';
  }

  findAll() {
    return `This action returns all fonctions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fonction`;
  }

  update(id: number, FonctionDto: FonctionDto) {
    return `This action updates a #${id} fonction`;
  }

  remove(id: number) {
    return `This action removes a #${id} fonction`;
  }
}
