import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormationTypesService } from './formation-types.service';
import { CreateFormationTypeDto } from './dto/create-formation-type.dto';
import { UpdateFormationTypeDto } from './dto/update-formation-type.dto';

@Controller('formation-types')
export class FormationTypesController {
  constructor(private readonly formationTypesService: FormationTypesService) {}

  @Post()
  create(@Body() createFormationTypeDto: CreateFormationTypeDto) {
    return this.formationTypesService.create(createFormationTypeDto);
  }

  @Get()
  findAll() {
    return this.formationTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formationTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormationTypeDto: UpdateFormationTypeDto) {
    return this.formationTypesService.update(+id, updateFormationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formationTypesService.remove(+id);
  }
}
