import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FonctionsService } from './fonctions.service';
import { FonctionDto } from './dto/fonction.dto';


@Controller('fonctions')
export class FonctionsController {
  constructor(private readonly fonctionsService: FonctionsService) {}

  @Post()
  create(@Body() FonctionDto: FonctionDto) {
    return this.fonctionsService.create(FonctionDto);
  }

  @Get()
  findAll() {
    return this.fonctionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fonctionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() FonctionDto: FonctionDto) {
    return this.fonctionsService.update(+id, FonctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fonctionsService.remove(+id);
  }
}
