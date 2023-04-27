import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
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

@Controller('formations')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('FORMATIONS') // cree une categorie FORMATIONS dans swagger UI
export class FormationsController {
  constructor(private readonly formationsService: FormationsService,
    private readonly formationTypesService: FormationTypesService,
    private readonly sallesService: SallesService
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

  @Get()
  async findAll() {
    const formations = await this.formationsService.findAll();
    if (formations.length === 0) throw new HttpException('No formation found', HttpStatus.NOT_FOUND);
    return formations
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
