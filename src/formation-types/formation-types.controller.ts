import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException, ClassSerializerInterceptor } from '@nestjs/common';
import { FormationTypesService } from './formation-types.service';
import { CreateFormationTypeDto } from './dto/create-formation-type.dto';
import { UpdateFormationTypeDto } from './dto/update-formation-type.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiTags } from '@nestjs/swagger';
import { AgentFormationTypeDto } from './dto/agent-formationTypeDto';
import { UsersService } from 'src/users/users.service';

@Controller('formation-types')
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('TYPE FORMATION') // cree une categorie TYPE FORMATION dans swagger UI
export class FormationTypesController {
  constructor(private readonly formationTypesService: FormationTypesService,
    private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createFormationTypeDto: CreateFormationTypeDto) {
    const sameFormType = await this.formationTypesService.findOneByName(createFormationTypeDto.name);
    if (!sameFormType) return await this.formationTypesService.create(createFormationTypeDto);
    if (sameFormType.isActive) throw new HttpException('Formation Type already exist', HttpStatus.CONFLICT);
    return await this.formationTypesService.active(sameFormType, createFormationTypeDto);
  }

  @Post('formateur/:id')
  async addFormateur(@Param('id') id: string, @Body() formateurDto: AgentFormationTypeDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationTypeFound = await this.formationTypesService.findOne(+id);
    if (!formationTypeFound || !formationTypeFound.isActive)
      throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);

    if (formationTypeFound.formateurs.find(user => user.id === formateurDto.userId))
      throw new HttpException('formateur already exist', HttpStatus.CONFLICT);

    const formateur = await this.usersService.findOneById(formateurDto.userId)
    if (!formateur || !formateur.isActive) throw new HttpException('Formateur not found', HttpStatus.NOT_FOUND);

    return await this.formationTypesService.addFormateur(formationTypeFound, formateur);
  }

  @Delete('formateur/:id')
  async removeFormateur(@Param('id') id: string, @Body() formateurDto: AgentFormationTypeDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationTypeFound = await this.formationTypesService.findOne(+id);
    if (!formationTypeFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);

    if (!formationTypeFound.formateurs.find(user => user.id === formateurDto.userId))
      throw new HttpException('formateur not found', HttpStatus.NOT_FOUND);

    return await this.formationTypesService.removeFormateur(formationTypeFound, formateurDto.userId);
  }

  @Get()
  async findAll() {
    const formationTypes = await this.formationTypesService.findAll();
    if (formationTypes.length === 0) throw new HttpException('No formation Type found', HttpStatus.NOT_FOUND);
    return formationTypes
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFormationTypeDto: UpdateFormationTypeDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    if (!updateFormationTypeDto.codeRAF && !updateFormationTypeDto.duree && !updateFormationTypeDto.name)
      throw new HttpException('nothing to update', HttpStatus.BAD_REQUEST);

    const formTypeFound = await this.formationTypesService.findOne(+id);
    if (!formTypeFound) throw new HttpException('Formation Type not found', HttpStatus.NOT_FOUND);
    if (!formTypeFound.isActive) throw new HttpException('Formation Type deleted', HttpStatus.NOT_FOUND);

    return await this.formationTypesService.update(formTypeFound, updateFormationTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const formTypeFound = await this.formationTypesService.findOne(+id);
    if (!formTypeFound) throw new HttpException('salle not found', HttpStatus.NOT_FOUND);
    if (!formTypeFound.isActive) throw new HttpException('salle already deleted', HttpStatus.BAD_REQUEST);
    return await this.formationTypesService.remove(formTypeFound);
  }
}
