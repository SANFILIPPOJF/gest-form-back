import { Injectable } from '@nestjs/common';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';

@Injectable()
export class ResidencesService {
  create(createResidenceDto: CreateResidenceDto) {
    return 'This action adds a new residence';
  }

  findAll() {
    return `This action returns all residences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} residence`;
  }

  update(id: number, updateResidenceDto: UpdateResidenceDto) {
    return `This action updates a #${id} residence`;
  }

  remove(id: number) {
    return `This action removes a #${id} residence`;
  }
}
