import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const cp = createUserDto.cp.toUpperCase();
    const password = createUserDto.password;
    const name = createUserDto.name
    try {
      return await User.create({ cp, password, name }).save();
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByCp(cp: string) {
    try {
      return await User.findOneBy({ cp });
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
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await User.findOneBy({ id });
      if (updateUserDto.cp) user.cp = updateUserDto.cp.toUpperCase();
      if (updateUserDto.name) user.name = updateUserDto.name;
      if (updateUserDto.password) user.password = updateUserDto.password;
      await user.save();
      delete user.password;
      return user
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async active(id: number, createUserDto: CreateUserDto) {
    try {
      const user = await User.findOneBy({ id });
      user.name = createUserDto.name;
      user.password = createUserDto.password;
      user.isActive = true;
      await user.save();
      delete user.password;
      return user
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async remove(id: number) {
    try {
      const user = await this.findOneById(id);
      user.isActive=false;
      await user.save();
      return
    }
    catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
