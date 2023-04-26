import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ResidencesService } from './residences.service';
import { ResidenceDto } from './dto/residence.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller('residences')
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('RESIDENCES') // cree une categorie RESIDENCES dans swagger UI
export class ResidencesController {
  constructor(private readonly residencesService: ResidencesService) {}

  @Post()
  async create(@Body() residenceDto: ResidenceDto) {
    const sameResidence = await this.residencesService.findOneByName(residenceDto.name);
    if (!sameResidence) return await this.residencesService.create(residenceDto);
    if (sameResidence.isActive) throw new HttpException('Residence allready exist', HttpStatus.CONFLICT);
    return await this.residencesService.active(sameResidence);
  }

  @Get()
  async findAll() {
    const residences = await this.residencesService.findAll();
    if (residences.length === 0) throw new HttpException('No residence found', HttpStatus.NOT_FOUND);
    return residences
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() residenceDto: ResidenceDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const residenceFound = await this.residencesService.findOne(+id);
    if (!residenceFound) throw new HttpException('residence not found', HttpStatus.NOT_FOUND);
    if (!residenceFound.isActive) throw new HttpException('residence deleted', HttpStatus.NOT_FOUND);
    
    const sameResidence = await this.residencesService.findOneByName(residenceDto.name);
    if (sameResidence) {
      if (sameResidence.isActive)
        throw new HttpException('Residence allready exist', HttpStatus.CONFLICT);
        await this.residencesService.remove(residenceFound);
        return await this.residencesService.active(sameResidence);
    }
    return await this.residencesService.update(residenceFound, residenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id)
      throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const residenceFound = await this.residencesService.findOne(+id);
    if (!residenceFound) throw new HttpException('residence not found', HttpStatus.NOT_FOUND);
    if (!residenceFound.isActive) throw new HttpException('residence already deleted', HttpStatus.BAD_REQUEST);
    return await this.residencesService.remove(residenceFound);
  }
}
