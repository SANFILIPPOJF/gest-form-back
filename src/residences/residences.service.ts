import { Injectable } from '@nestjs/common';
import { ResidenceDto } from './dto/residence.dto';

@Injectable()
export class ResidencesService {
  create(ResidenceDto: ResidenceDto) {
    return 'This action adds a new residence';
  }

  findAll() {
    return `This action returns all residences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} residence`;
  }

  update(id: number, ResidenceDto: ResidenceDto) {
    return `This action updates a #${id} residence`;
  }

  remove(id: number) {
    return `This action removes a #${id} residence`;
  }
}
