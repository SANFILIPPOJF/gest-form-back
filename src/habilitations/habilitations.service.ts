import { Injectable } from '@nestjs/common';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';
import { UpdateHabilitationDto } from './dto/update-habilitation.dto';

@Injectable()
export class HabilitationsService {
  create(createHabilitationDto: CreateHabilitationDto) {
    return 'This action adds a new habilitation';
  }

  findAll() {
    return `This action returns all habilitations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habilitation`;
  }

  update(id: number, updateHabilitationDto: UpdateHabilitationDto) {
    return `This action updates a #${id} habilitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} habilitation`;
  }
}
