import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetCurrentOngById } from '../../../auth/helpers/get-current-ong.decorator';
import { Public } from '../../../auth/helpers/public.decorator';
import { CreateIncidentDto } from '../../dtos/create-incident.dto';
import { UpdateIncidentDto } from '../../dtos/update-incident.dto';
import { CreateIncidentUseCase } from '../../useCases/create-incident/create-incident-use-case';
import { DeleteIncidentUseCase } from '../../useCases/delete-incident/delete-incident-use-case';
import { GetAllIncidentUseCase } from '../../useCases/get-all-incident/get-all-incident-use-case';
import { GetIncidentUseCase } from '../../useCases/get-incident/get-incident-use-case';
import { UpdateIncidentUseCase } from '../../useCases/update-incident/update-incident-use-case';
import { FinishedIncidentUseCase } from '../../useCases/finished-incident/finished-incident-use-case';
import { GetAllFinishedIncidentUseCase } from '../../useCases/get-all-finished-incident/get-all-finished-incident-use-case';

@Controller('incidents')
export class IncidentsController {
  constructor(
    private readonly createIncident: CreateIncidentUseCase,
    private readonly getAllIncident: GetAllIncidentUseCase,
    private readonly getAllFinishedIncident: GetAllFinishedIncidentUseCase,
    private readonly getIncident: GetIncidentUseCase,
    private readonly updateIncident: UpdateIncidentUseCase,
    private readonly deleteIncident: DeleteIncidentUseCase,
    private readonly finishedIncident: FinishedIncidentUseCase,
  ) {}

  // @UseGuards(AccessTokenAuthGuard)
  @Post()
  create(
    @GetCurrentOngById() ong_id: string,
    @Body() { title, description, value }: CreateIncidentDto,
  ) {
    const createIncidentDto = {
      title,
      description,
      value,
      ongId: ong_id,
    };

    return this.createIncident.execute(createIncidentDto);
  }

  @Public()
  @Get()
  listAllIncidents(@Query('page') pageQuery = 1) {
    return this.getAllIncident.execute({
      pagination: pageQuery,
    });
  }

  @Public()
  @Get('/finished')
  listAllFinishedIncidents() {
    return this.getAllFinishedIncident.execute();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) incidentId: string) {
    return this.getIncident.execute({ incidentId });
  }

  //@Role('admin')
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) incidentId: string,
    @GetCurrentOngById() ongId: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.updateIncident.execute({
      ongId,
      incidentId,
      ...updateIncidentDto,
    });
  }

  //@Role('admin')
  @Delete(':id')
  @HttpCode(204)
  remove(
    @GetCurrentOngById() ongId: string,
    @Param('id', new ParseUUIDPipe()) incidentId: string,
  ) {
    return this.deleteIncident.execute({ ongId, incidentId });
  }

  @Patch(':id/finished')
  @HttpCode(200)
  incidentDone(
    @GetCurrentOngById() ongId: string,
    @Param('id', new ParseUUIDPipe()) incidentId: string,
  ) {
    return this.finishedIncident.execute({ ongId, incidentId });
  }
}
