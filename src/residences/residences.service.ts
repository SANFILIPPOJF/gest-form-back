import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ResidenceDto } from './dto/residence.dto';
import { Residence } from './entities/residence.entity';

@Injectable()
export class ResidencesService {
  async create(residenceDto: ResidenceDto) {
    try {
      return await Residence.create({ ...residenceDto }).save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async active(residence: Residence) {
    try {
      residence.isActive = true;
      return await residence.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findAll() {
    try {
      return await Residence.findBy({ isActive: true });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      return await Residence.findOneBy({ id })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findOneByName(name: string) {
    try {
      return await Residence.findOneBy({ name })
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(residence: Residence, residenceDto: ResidenceDto) {
    try {
      residence.name = residenceDto.name;
      return await residence.save()
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(residence: Residence) {
    try {
      residence.isActive=false;
      return await residence.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
