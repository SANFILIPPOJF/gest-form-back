import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus, ClassSerializerInterceptor } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiTags } from '@nestjs/swagger';
import { CancelFormationDto } from './dto/cancel-formation.dto';
import { STATUS } from 'src/constants/formation-status';
import { FormationTypesService } from 'src/formation-types/formation-types.service';
import { FormationType } from 'src/formation-types/entities/formation-type.entity';
import { Salle } from 'src/salles/entities/salle.entity';
import { SallesService } from 'src/salles/salles.service';
import { AgentFormationDto } from './dto/agent-formationDto';
import { UsersService } from 'src/users/users.service';

@Controller('formations')
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('FORMATIONS') // cree une categorie FORMATIONS dans swagger UI
export class FormationsController {
  constructor(private readonly formationsService: FormationsService,
    private readonly formationTypesService: FormationTypesService,
    private readonly sallesService: SallesService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  async create(@Body() createFormationDto: CreateFormationDto) {

    if (new Date(createFormationDto.date) < new Date(Date.now()))
      throw new HttpException('Date already past', HttpStatus.BAD_REQUEST);

    const formTypeFound = await this.formationTypesService.findOne(createFormationDto.formTypeId)
    if (!formTypeFound || !formTypeFound.isActive)
      throw new HttpException('Type formation not found', HttpStatus.NOT_FOUND);

    let salleFound: Salle = null;
    if (createFormationDto.salleId) {
      salleFound = await this.sallesService.findOne(createFormationDto.salleId);
      if (!salleFound || !salleFound.isActive)
        throw new HttpException('salle not found', HttpStatus.NOT_FOUND);
    }

    return await this.formationsService.create(createFormationDto, formTypeFound, salleFound);
  }

  @Post('participant/:id')
  async addParticipant(@Param('id') id: string, @Body() participantDto: AgentFormationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation already realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation already cancelled', HttpStatus.BAD_REQUEST);

    if (formationFound.participants.find(user => user.id === participantDto.userId))
      throw new HttpException('Participant already exist', HttpStatus.CONFLICT);

    const participant = await this.usersService.findOneById(participantDto.userId)
    if (!participant || !participant.isActive) throw new HttpException('Participant not found', HttpStatus.NOT_FOUND);

    return await this.formationsService.addParticipant(formationFound,participant);
  }

  @Delete('participant/:id')
  async removeParticipant(@Param('id') id: string, @Body() participantDto: AgentFormationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation already realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation already cancelled', HttpStatus.BAD_REQUEST);

    if (!formationFound.participants.find(user => user.id === participantDto.userId))
      throw new HttpException('Participant not found', HttpStatus.NOT_FOUND);
    
    return await this.formationsService.removeParticipant(formationFound,participantDto.userId);
  }
  @Post('formateur/:id')
  async addFormateur(@Param('id') id: string, @Body() formateurDto: AgentFormationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation already realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation already cancelled', HttpStatus.BAD_REQUEST);

    if (formationFound.formateurs.find(user => user.id === formateurDto.userId))
      throw new HttpException('formateur already exist', HttpStatus.CONFLICT);

    const formateur = await this.usersService.findOneById(formateurDto.userId)
    if (!formateur || !formateur.isActive) throw new HttpException('Formateur not found', HttpStatus.NOT_FOUND);

    return await this.formationsService.addFormateur(formationFound,formateur);
  }

  @Delete('formateur/:id')
  async removeFormateur(@Param('id') id: string, @Body() formateurDto: AgentFormationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation already realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation already cancelled', HttpStatus.BAD_REQUEST);

    if (!formationFound.formateurs.find(user => user.id === formateurDto.userId))
      throw new HttpException('formateur not found', HttpStatus.NOT_FOUND);
    
    return await this.formationsService.removeFormateur(formationFound,formateurDto.userId);
  }
  @Get()
  async findAll() {
    const formations = await this.formationsService.findAll();
    if (formations.length === 0) throw new HttpException('No formation found', HttpStatus.NOT_FOUND);
    return formations;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFormationDto: UpdateFormationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const { date, heure, formTypeId, salleId } = updateFormationDto;
    if (!date && !heure && !formTypeId)
      throw new HttpException('nothing to update', HttpStatus.BAD_REQUEST);

    if (date && (new Date(updateFormationDto.date) < new Date(Date.now())))
      throw new HttpException('Date already past', HttpStatus.BAD_REQUEST);

    let formTypeFound: FormationType = null;
    if (formTypeId) {
      formTypeFound = await this.formationTypesService.findOne(formTypeId);
      if (!formTypeFound || !formTypeFound.isActive)
        throw new HttpException('Type formation not found', HttpStatus.NOT_FOUND);
    }
    let salleFound: Salle = null;
    if (salleId) {
      salleFound = await this.sallesService.findOne(salleId);
      if (!salleFound || !salleFound.isActive)
        throw new HttpException('salle not found', HttpStatus.NOT_FOUND);
    }
    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation already realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation already cancelled', HttpStatus.BAD_REQUEST);

    return await this.formationsService.update(formationFound, updateFormationDto, formTypeFound, salleFound);
  }

  @Patch('valid/:id')
  async valid(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.VALIDATED) throw new HttpException('Formation already validated', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation cancelled', HttpStatus.BAD_REQUEST);

    return await this.formationsService.updateStatus(formationFound, STATUS.VALIDATED);
  }

  @Patch('realize/:id')
  async realize(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const formationFound = await this.formationsService.findOne(+id);

    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.CREATED) throw new HttpException('Formation not validated', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation already realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation cancelled', HttpStatus.BAD_REQUEST);

    return await this.formationsService.updateStatus(formationFound, STATUS.REALIZED);
  }

  @Delete('cancel/:id')
  async cancel(@Param('id') id: string, @Body() cancelFormationDto: CancelFormationDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status === STATUS.REALIZED) throw new HttpException('Formation realized', HttpStatus.BAD_REQUEST);
    if (formationFound.status === STATUS.CANCELLED) throw new HttpException('Formation already cancelled', HttpStatus.BAD_REQUEST);

    return await this.formationsService.cancel(formationFound, cancelFormationDto.motifAnnulation);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const formationFound = await this.formationsService.findOne(+id);
    if (!formationFound) throw new HttpException('Formation not found', HttpStatus.NOT_FOUND);
    if (formationFound.status > STATUS.CREATED)
      throw new HttpException('Impossible to delete because of formation status', HttpStatus.FORBIDDEN);
    return await this.formationsService.delete(formationFound);
  }
}
