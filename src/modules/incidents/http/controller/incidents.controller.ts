import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateIncidentDto } from '../../dtos/create-incident.dto';
import { UpdateIncidentDto } from '../../dtos/update-incident.dto';
import { GetCurrentOngById } from '../../../auth/helpers/get-current-ong.decorator';
import { CreateIncidentUseCase } from '@modules/incidents/useCases/create-incident/create-incident-use-case';

@Controller('incidents')
export class IncidentsController {
  constructor(private readonly createIncident: CreateIncidentUseCase) {}

  // @UseGuards(AccessTokenAuthGuard)
  @Post()
  create(
    @GetCurrentOngById() ong_id: string,
    @Body() { title, description, value, ongId }: CreateIncidentDto,
  ) {
    const createIncidentDto = {
      title,
      description,
      value,
      ongId: ong_id,
    };

    return this.createIncident.execute(createIncidentDto);
  }

  @Get()
  findAll() {
    return 'this.incidentsService.findAll()';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'this.incidentsService.findOne(+id)';
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return 'this.incidentsService.update(+id, updateIncidentDto)';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.incidentsService.remove(+id)';
  }
}
