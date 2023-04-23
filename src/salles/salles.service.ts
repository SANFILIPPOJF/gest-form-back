import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { Salle } from './entities/salle.entity';

@Injectable()
export class SallesService {
  async create(createSalleDto: CreateSalleDto) {
    try {
      return await Salle.create({...createSalleDto}).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async active(salle: Salle) {
    try {
      salle.isActive = true;
      return await salle.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findAll() {
    try {
      return Salle.findBy({isActive: true});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    try {
      return Salle.findOneBy({id})
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByName(name: string) {
    try {
      return await Salle.findOneBy({ name })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(salle: Salle, updateSalleDto: UpdateSalleDto) {
    try {
      if (updateSalleDto.adresse) salle.adresse=updateSalleDto.adresse;
      if (updateSalleDto.name) salle.name=updateSalleDto.name;
      if (updateSalleDto.capacite) salle.capacite=updateSalleDto.capacite;
      return await salle.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(salle: Salle) {
    try {
      salle.isActive=false;
      return await salle.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
