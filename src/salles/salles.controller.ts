import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { SallesService } from './salles.service';
import { CreateSalleDto } from './dto/create-salle.dto';
import { UpdateSalleDto } from './dto/update-salle.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';

@Controller('salles')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('SALLES') // cree une categorie USERS dans swagger UI
export class SallesController {
  constructor(private readonly sallesService: SallesService) {}

  @Post()
  async create(@Body() createSalleDto: CreateSalleDto) {
    const sameSalle = await this.sallesService.findOneByName(createSalleDto.name);
    if (!sameSalle) return this.sallesService.create(createSalleDto);
    if (sameSalle.isActive) throw new HttpException('Salle allready exist', HttpStatus.CONFLICT);
    return this.sallesService.active(sameSalle,createSalleDto);
  }

  @Get()
  async findAll() {
    const salles = await this.sallesService.findAll();
    if (salles.length===0) throw new HttpException('No salle found', HttpStatus.NOT_FOUND);
    return salles
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSalleDto: UpdateSalleDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id)!==+id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    if (!updateSalleDto.adresse && !updateSalleDto.capacite && !updateSalleDto.name)
      throw new HttpException('nothing to update', HttpStatus.BAD_REQUEST);
    const salleFound = await this.sallesService.findOne(+id);
    if (!salleFound) throw new HttpException('salle not found', HttpStatus.NOT_FOUND);
    if (!salleFound.isActive) throw new HttpException('salle deleted', HttpStatus.NOT_FOUND);
    return this.sallesService.update(salleFound, updateSalleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id)!==+id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const salleFound = await this.sallesService.findOne(+id);
    if (!salleFound) throw new HttpException('salle not found', HttpStatus.NOT_FOUND);
    if (!salleFound.isActive) throw new HttpException('salle already deleted', HttpStatus.BAD_REQUEST);
    return this.sallesService.remove(salleFound);
  }
}
