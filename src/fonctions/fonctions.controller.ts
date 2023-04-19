import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FonctionsService } from './fonctions.service';
import { CreateFonctionDto } from './dto/create-fonction.dto';
import { UpdateFonctionDto } from './dto/update-fonction.dto';

@Controller('fonctions')
export class FonctionsController {
  constructor(private readonly fonctionsService: FonctionsService) {}

  @Post()
  create(@Body() createFonctionDto: CreateFonctionDto) {
    return this.fonctionsService.create(createFonctionDto);
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
  update(@Param('id') id: string, @Body() updateFonctionDto: UpdateFonctionDto) {
    return this.fonctionsService.update(+id, updateFonctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fonctionsService.remove(+id);
  }
}
