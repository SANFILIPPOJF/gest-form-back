import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResidencesService } from './residences.service';
import { ResidenceDto } from './dto/residence.dto';


@Controller('residences')
export class ResidencesController {
  constructor(private readonly residencesService: ResidencesService) {}

  @Post()
  create(@Body() ResidenceDto: ResidenceDto) {
    return this.residencesService.create(ResidenceDto);
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
  update(@Param('id') id: string, @Body() ResidenceDto: ResidenceDto) {
    return this.residencesService.update(+id, ResidenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residencesService.remove(+id);
  }
}
