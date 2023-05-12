import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Residence } from 'src/residences/entities/residence.entity';
import { Fonction } from 'src/fonctions/entities/fonction.entity';
import { PasswordDto } from './dto/password.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto, residence: Residence, fonction: Fonction) {
    const {cp, password, name}= createUserDto;
    try {
      return await User.create({cp, password, name, fonction, residence}).save();
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll (){
    try {
      return await User.find({ 
        relations: { residence: true,
                    fonction: true} });
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async findOneByCp(cp: string) {
    try {
      return await User.findOne({ where: { cp },
        relations: { residence: true,
                    fonction: true,
                    habilitations: true,
                    formations : true,
                    forme: true,
                    habFormateurs:true} });
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneById(id: number) {
    try {
      return await User.findOneBy({ id });
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(user:User, updateUserDto: UpdateUserDto, residence: Residence, fonction: Fonction) {
    try {
      if (updateUserDto.name) user.name = updateUserDto.name;
      if (residence) user.residence = residence;
      if (fonction) user.fonction = fonction;
      await user.save();
      delete user.password;
      return user
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updatePassword(user:User, passwordDto: PasswordDto) {
    try {
      user.password = passwordDto.password;
      await user.save();
      delete user.password;
      return user
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async active(user: User, createUserDto: CreateUserDto, residence: Residence, fonction: Fonction) {
    try {
      user.name = createUserDto.name;
      user.password = createUserDto.password;
      user.isActive = true;
      user.fonction = fonction;
      user.residence = residence;
      await user.save();
      delete user.password;
      return user
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async remove(user: User) {
    try {
      user.isActive=false;
      await user.save();
      return
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
