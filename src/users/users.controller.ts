import { Controller, Get, Post, ClassSerializerInterceptor, UseInterceptors, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('USERS') // cree une categorie USERS dans swagger UI
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.passwordConfirm) {
      throw new HttpException('Uncorrect password confirmation', HttpStatus.BAD_REQUEST);
    }
    const userTest = await this.usersService.findOneByCp(createUserDto.cp);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    if (!userTest) {
      return await this.usersService.create(createUserDto);
    }
    if (userTest.isActive) throw new HttpException('User allready exist', HttpStatus.CONFLICT);
    return await this.usersService.active(userTest,createUserDto);
  }

  @Get('cp/:cp')
  async findOne(@Param('cp') cp: string) {
    if (cp.length != 8) throw new HttpException('CP must have 8 character', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneByCp(cp.toUpperCase());
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    return userFound
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    if (isNaN(+id)) throw new HttpException('ID must be a number', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    return userFound;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (isNaN(+id)) throw new HttpException('ID must be a number', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    userFound.password = await bcrypt.hash(updateUserDto.password, 10)
    return await this.usersService.update(userFound, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id)) throw new HttpException('ID must be a number', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User allready deleted', HttpStatus.NOT_FOUND);
    await this.usersService.remove(userFound);
    throw new HttpException('User deleted', HttpStatus.ACCEPTED);
  }
}
