import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpStatus, HttpException } from '@nestjs/common';
import { FormationTypesService } from './formation-types.service';
import { CreateFormationTypeDto } from './dto/create-formation-type.dto';
import { UpdateFormationTypeDto } from './dto/update-formation-type.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiTags } from '@nestjs/swagger';


@Controller('formation-types')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('TYPE FORMATION') // cree une categorie TYPE FORMATION dans swagger UI
export class FormationTypesController {
  constructor(private readonly formationTypesService: FormationTypesService) { }

  @Post()
  async create(@Body() createFormationTypeDto: CreateFormationTypeDto) {
    const sameFormType = await this.formationTypesService.findOneByName(createFormationTypeDto.name);
    if (!sameFormType) return this.formationTypesService.create(createFormationTypeDto);
    if (sameFormType.isActive) throw new HttpException('Formation Type allready exist', HttpStatus.CONFLICT);
    return this.formationTypesService.active(sameFormType, createFormationTypeDto);
  }

  @Get()
  async findAll() {
    const formationTypes = await this.formationTypesService.findAll();
    if (formationTypes.length === 0) throw new HttpException('No formation Type found', HttpStatus.NOT_FOUND);
    return formationTypes
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFormationTypeDto: UpdateFormationTypeDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id)!==+id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    if (!updateFormationTypeDto.codeRAF && !updateFormationTypeDto.duree && !updateFormationTypeDto.name)
      throw new HttpException('nothing to update', HttpStatus.BAD_REQUEST);
    const formTypeFound = await this.formationTypesService.findOne(+id);
    if (!formTypeFound) throw new HttpException('Formation Type not found', HttpStatus.NOT_FOUND);
    if (!formTypeFound.isActive) throw new HttpException('Formation Type deleted', HttpStatus.NOT_FOUND);
    return this.formationTypesService.update(formTypeFound, updateFormationTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id)!==+id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const formTypeFound = await this.formationTypesService.findOne(+id);
    if (!formTypeFound) throw new HttpException('salle not found', HttpStatus.NOT_FOUND);
    if (!formTypeFound.isActive) throw new HttpException('salle already deleted', HttpStatus.BAD_REQUEST);
    return this.formationTypesService.remove(formTypeFound);
  }
}
