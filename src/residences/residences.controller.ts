import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResidencesService } from './residences.service';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';

@Controller('residences')
export class ResidencesController {
  constructor(private readonly residencesService: ResidencesService) {}

  @Post()
  create(@Body() createResidenceDto: CreateResidenceDto) {
    return this.residencesService.create(createResidenceDto);
  }

  @Get()
  findAll() {
    return this.residencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResidenceDto: UpdateResidenceDto) {
    return this.residencesService.update(+id, updateResidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residencesService.remove(+id);
  }
}
