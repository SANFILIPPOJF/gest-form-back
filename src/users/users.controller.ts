import { Controller, Get, Post, ClassSerializerInterceptor, UseInterceptors, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { ResidencesService } from 'src/residences/residences.service';
import { FonctionsService } from 'src/fonctions/fonctions.service';


@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('USERS') // cree une categorie USERS dans swagger UI
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly residencesService: ResidencesService,
    private readonly fonctionsService: FonctionsService
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.cp=createUserDto.cp.toUpperCase();
    const { cp, password, passwordConfirm, residenceId, fonctionId } = createUserDto
    if (password != passwordConfirm)
      throw new HttpException('Uncorrect password confirmation', HttpStatus.BAD_REQUEST);

    const residenceFound = await this.residencesService.findOne(residenceId);
    if (!residenceFound || !residenceFound.isActive)
      throw new HttpException('residence not found', HttpStatus.NOT_FOUND);

    const fonctionFound = await this.fonctionsService.findOne(fonctionId);
    if (!fonctionFound || !fonctionFound.isActive)
      throw new HttpException('fonction not found', HttpStatus.NOT_FOUND);

    const userFound = await this.usersService.findOneByCp(cp);
    createUserDto.password = await bcrypt.hash(password, 10)
    if (!userFound) return await this.usersService.create(createUserDto, residenceFound, fonctionFound);
    if (userFound.isActive) throw new HttpException('User allready exist', HttpStatus.CONFLICT);

    return await this.usersService.active(userFound, createUserDto, residenceFound, fonctionFound);
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
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    return userFound;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    userFound.password = await bcrypt.hash(updateUserDto.password, 10);

    const residenceFound = await this.residencesService.findOne(updateUserDto.residenceId);
    if (updateUserDto.residenceId && (!residenceFound || !residenceFound.isActive))
      throw new HttpException('residence not found', HttpStatus.NOT_FOUND);

    const fonctionFound = await this.fonctionsService.findOne(updateUserDto.fonctionId);
    if (updateUserDto.fonctionId && (!fonctionFound || !fonctionFound.isActive))
      throw new HttpException('fonction not found', HttpStatus.NOT_FOUND);

    return await this.usersService.update(userFound, updateUserDto, residenceFound, fonctionFound);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User allready deleted', HttpStatus.NOT_FOUND);
    await this.usersService.remove(userFound);
    throw new HttpException('User deleted', HttpStatus.ACCEPTED);
  }
}
