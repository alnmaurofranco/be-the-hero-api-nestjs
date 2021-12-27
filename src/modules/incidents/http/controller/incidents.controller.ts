import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateIncidentDto } from '../../dtos/create-incident.dto';
import { UpdateIncidentDto } from '../../dtos/update-incident.dto';
import { AccessTokenAuthGuard } from '../../../auth/helpers/guards/access-token-guard.guard';
import { GetCurrentOngById } from '../../../auth/helpers/get-current-ong.decorator';

@Controller('incidents')
export class IncidentsController {
  // constructor(private readonly incidentsService: IncidentsService) {}

  @UseGuards(AccessTokenAuthGuard)
  @Post()
  create(
    @GetCurrentOngById() ong_id: string,
    @Body() createIncidentDto: CreateIncidentDto,
  ) {
    return `${ong_id} && ${createIncidentDto}`;
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
