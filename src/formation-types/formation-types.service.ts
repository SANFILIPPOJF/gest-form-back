import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFormationTypeDto } from './dto/create-formation-type.dto';
import { UpdateFormationTypeDto } from './dto/update-formation-type.dto';
import { FormationType } from './entities/formation-type.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FormationTypesService {
  async create(createFormationTypeDto: CreateFormationTypeDto) {
    try {
      const formateurs = [];
      return await FormationType.create({...createFormationTypeDto,formateurs}).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  
  async addFormateur(formationType: FormationType, formateur: User) {
    try {
      formationType.formateurs.push(formateur);
      return await formationType.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async removeFormateur(formationType: FormationType, formateurId: number){
    try {
      formationType.formateurs = formationType.formateurs.filter( user => user.id !== formateurId);
      return formationType.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async active(formationType: FormationType, createFormationTypeDto: CreateFormationTypeDto) {
    try {
      formationType.codeRAF = createFormationTypeDto.codeRAF;
      formationType.duree = createFormationTypeDto.duree;
      formationType.isActive = true;
      return await formationType.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  findAll() {
    try {
      return FormationType.findBy({isActive: true});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    try {
      return FormationType.findOne({ where: { id }, relations: { formateurs: true } })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByName(name: string) {
    try {
      return await FormationType.findOneBy({ name })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(formationType: FormationType, updateFormationTypeDto: UpdateFormationTypeDto) {
    try {
      if (updateFormationTypeDto.codeRAF) formationType.codeRAF=updateFormationTypeDto.codeRAF;
      if (updateFormationTypeDto.name) formationType.name=updateFormationTypeDto.name;
      if (updateFormationTypeDto.duree) formationType.duree=updateFormationTypeDto.duree;
      return await formationType.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(formationType: FormationType) {
    try {
      formationType.isActive=false;
      return await formationType.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
