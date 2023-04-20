import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabilitationsService } from './habilitations.service';
import { CreateHabilitationDto } from './dto/create-habilitation.dto';
import { UpdateHabilitationDto } from './dto/update-habilitation.dto';

@Controller('habilitations')
export class HabilitationsController {
  constructor(private readonly habilitationsService: HabilitationsService) {}

  @Post()
  create(@Body() createHabilitationDto: CreateHabilitationDto) {
    return this.habilitationsService.create(createHabilitationDto);
  }

  @Get()
  findAll() {
    return this.habilitationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habilitationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabilitationDto: UpdateHabilitationDto) {
    return this.habilitationsService.update(+id, updateHabilitationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habilitationsService.remove(+id);
  }
}
