import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FonctionsService } from './fonctions.service';
import { FonctionDto } from './dto/fonction.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller('fonctions')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('FONCTIONS') // cree une categorie FONCTIONS dans swagger UI
export class FonctionsController {
  constructor(private readonly fonctionsService: FonctionsService) {}

  @Post()
  async create(@Body() fonctionDto: FonctionDto) {
  const sameFonction = await this.fonctionsService.findOneByName(fonctionDto.name);
  if (!sameFonction) return await this.fonctionsService.create(fonctionDto);
  if (sameFonction.isActive) throw new HttpException('Salle allready exist', HttpStatus.CONFLICT);
  return await this.fonctionsService.active(sameFonction);
  }

  @Get()
  async findAll() {
    const fonctions = await this.fonctionsService.findAll();
    if (fonctions.length === 0) throw new HttpException('No fonction found', HttpStatus.NOT_FOUND);
    return fonctions
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() fonctionDto: FonctionDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const fonctionFound = await this.fonctionsService.findOne(+id);
    if (!fonctionFound) throw new HttpException('fonction not found', HttpStatus.NOT_FOUND);
    if (!fonctionFound.isActive) throw new HttpException('fonction deleted', HttpStatus.NOT_FOUND);
    return await this.fonctionsService.update(fonctionFound, fonctionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const fonctionFound = await this.fonctionsService.findOne(+id);
    if (!fonctionFound) throw new HttpException('fonction not found', HttpStatus.NOT_FOUND);
    if (!fonctionFound.isActive) throw new HttpException('fonction already deleted', HttpStatus.BAD_REQUEST);
    return await this.fonctionsService.remove(fonctionFound);
  }
}
