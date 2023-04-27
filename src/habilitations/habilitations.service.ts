import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';
import { Habilitation } from './entities/habilitation.entity';
import { User } from 'src/users/entities/user.entity';
import { FormationType } from 'src/formation-types/entities/formation-type.entity';


@Injectable()
export class HabilitationsService {
  async create(createHabilitationDto: CreateHabilitationDto, user: User, formationType: FormationType) {
    const {date} = createHabilitationDto;
    try {
      return await Habilitation.create({ date, user, formationType }).save();
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
  
  async findAllByFormType(formTypeId: number) {
    try {
      return await Habilitation.find({
        where: {
          formationType: { id: formTypeId }
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
