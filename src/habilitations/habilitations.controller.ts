import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { HabilitationsService } from './habilitations.service';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';
import { UpdateHabilitationDto } from './dto/update-habilitation.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { FormationTypesService } from 'src/formation-types/formation-types.service';

@Controller('habilitations')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('HABILITATIONS') // cree une categorie HABILITATIONS dans swagger UI

export class HabilitationsController {
  constructor(private readonly habilitationsService: HabilitationsService,
    private readonly usersService: UsersService,
    private readonly formationTypesService: FormationTypesService) { }

  @Post()
  async create(@Body() createHabilitationDto: CreateHabilitationDto) {
    const { userId, formationTypeId } = createHabilitationDto;

    if (isNaN(userId) || userId < 1 || Math.floor(userId) !== userId)
      throw new HttpException('user.ID must be a positive integer', HttpStatus.BAD_REQUEST);

    if (isNaN(formationTypeId) || formationTypeId < 1 || Math.floor(formationTypeId) !== formationTypeId)
      throw new HttpException('formationType.ID must be a positive integer', HttpStatus.BAD_REQUEST);

    if (new Date(createHabilitationDto.date) < new Date(Date.now()))
      throw new HttpException('Date already past', HttpStatus.BAD_REQUEST);

    const user = await this.usersService.findOneById(userId);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!user.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);

    const formationType = await this.formationTypesService.findOne(formationTypeId);
    if (!formationType) throw new HttpException('formationType not found', HttpStatus.NOT_FOUND);
    if (!formationType.isActive) throw new HttpException('FormationType deleted', HttpStatus.NOT_FOUND);

    const sameHabilitation = await this.habilitationsService.findOneByIds(userId, formationTypeId);
    if (sameHabilitation) throw new HttpException('habilitation allready exist', HttpStatus.CONFLICT);

    return this.habilitationsService.create(createHabilitationDto);
  }

  @Get(':id')
  async getAllByUser(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const user = await this.usersService.findOneById(+id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!user.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);

    const habilitations = await this.habilitationsService.findAllByUser(+id);
    if (habilitations.length === 0) throw new HttpException('No habilitation found', HttpStatus.NOT_FOUND);

    return habilitations
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateHabilitationDto: UpdateHabilitationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    if (new Date(updateHabilitationDto.date) < new Date(Date.now()))
      throw new HttpException('Date already past', HttpStatus.BAD_REQUEST);

    const habilitationFound = await this.habilitationsService.findOne(+id);
    if (!habilitationFound) throw new HttpException('habilitation not found', HttpStatus.NOT_FOUND);

    return await this.habilitationsService.update(habilitationFound, updateHabilitationDto.date);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const habilitationFound = await this.habilitationsService.findOne(+id);
    if (!habilitationFound)
      throw new HttpException('habilitation not found', HttpStatus.NOT_FOUND);

    return await this.habilitationsService.remove(habilitationFound);
  }
}
