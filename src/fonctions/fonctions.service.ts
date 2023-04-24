import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FonctionDto } from './dto/fonction.dto';
import { Fonction } from './entities/fonction.entity';


@Injectable()
export class FonctionsService {
  async create(fonctionDto: FonctionDto) {
    try {
      return await Fonction.create({...fonctionDto}).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async active(fonction: Fonction) {
    try {
      fonction.isActive = true;
      return await fonction.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findAll() {
    try {
      return await Fonction.findBy({isActive: true});
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await Fonction.findOneBy({id})
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByName(name: string) {
    try {
      return await Fonction.findOneBy({ name })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async update(fonction: Fonction, fonctionDto: FonctionDto) {
    try {
      fonction.name=fonctionDto.name;
      return await fonction.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(fonction: Fonction) {
    try {
      fonction.isActive=false;
      return await fonction.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
