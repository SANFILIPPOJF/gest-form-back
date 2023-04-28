import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation } from './entities/formation.entity';
import { STATUS } from 'src/constants/formation-status';
import { FormationType } from 'src/formation-types/entities/formation-type.entity';
import { Salle } from 'src/salles/entities/salle.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FormationsService {
  async create(createFormationDto: CreateFormationDto, formationType: FormationType, salle: Salle) {
    try {
      const { date, heure } = createFormationDto;
      const participants = [];
      return await Formation.create({ date, heure, formationType, salle, participants }).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await Formation.find({relations: { participants: true, formateurs: true }});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await Formation.findOne({ where: { id }, relations: { participants: true, formateurs: true } })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async addParticipant(formation: Formation, participant: User) {
    try {
      formation.participants.push(participant);
      return await formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeParticipant(formation: Formation, participantId: number){
    try {
      formation.participants = formation.participants.filter( user => user.id !== participantId);
      return formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async addFormateur(formation: Formation, formateur: User) {
    try {
      formation.formateurs.push(formateur);
      return await formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeFormateur(formation: Formation, formateurId: number){
    try {
      formation.formateurs = formation.formateurs.filter( user => user.id !== formateurId);
      return formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async update(formation: Formation, updateFormationDto: UpdateFormationDto, formationType: FormationType, salle: Salle) {
    try {
      if (updateFormationDto.date) formation.date = updateFormationDto.date;
      if (updateFormationDto.heure) formation.heure = updateFormationDto.heure;
      if (formationType) formation.formationType = formationType;
      if (salle) formation.salle = salle;
      return await formation.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateStatus(formation: Formation, status: number) {
    try {
      formation.status = status;
      return await formation.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async cancel(formation: Formation, motif: string) {
    try {
      formation.motifAnnulation = motif;
      formation.status = STATUS.CANCELLED;
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
