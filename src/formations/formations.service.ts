import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';
import { STATUS } from 'src/constants/formation-status';
import { FormationType } from 'src/formation-types/entities/formation-type.entity';

@Injectable()
export class FormationsService {
  async create(createFormationDto: CreateFormationDto, formationType: FormationType) {
    try {
      const {date,heure}= createFormationDto
      return await Formation.create({date,heure,formationType}).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await Formation.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await Formation.findOneBy({id})
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(formation: Formation, updateFormationDto: UpdateFormationDto, formationType?: FormationType ) {
    try {
      if (updateFormationDto.date) formation.date=updateFormationDto.date;
      if (updateFormationDto.heure) formation.heure=updateFormationDto.heure;
      if (formationType) formation.formationType=formationType;
      return await formation.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateStatus(formation: Formation,status: number) {
    try {
      formation.status=status;
      return await formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async cancel(formation: Formation, motif: string) {
    try {
      formation.motifAnnulation=motif;
      formation.status=STATUS.CANCELLED;
      return await formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async delete(formation: Formation) {
    try {
      return await formation.remove();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
