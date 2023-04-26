import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';
import { Habilitation } from './entities/habilitation.entity';


@Injectable()
export class HabilitationsService {
  async create(createHabilitationDto: CreateHabilitationDto) {
    try {
      return await Habilitation.create({ ...createHabilitationDto }).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllByUser(userId: number) {
    try {
      return await Habilitation.find({
        where: {
          user: { id: userId }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
  async findOne(id: number) {
    try {
      return await Habilitation.findOneBy({id});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByIds(userId: number, formationTypeId: number) {
    try {
      return await Habilitation.findOne({
        where: {
          user: { id: userId },
          formationType: { id: formationTypeId }
        }
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(habilitation: Habilitation, date: Date) {
    try {
      habilitation.date=date;
      return await habilitation.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(habilitation: Habilitation) {
    try {
      return await habilitation.remove();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
