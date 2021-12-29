import { Module } from '@nestjs/common';
import { IncidentsController } from './http/controller/incidents.controller';
import { IncidentsPrismaRepository } from './repositories/prisma/incidents-prisma-repository';
import { CreateIncidentUseCase } from '@modules/incidents/useCases/create-incident/create-incident-use-case';
import { GetAllIncidentUseCase } from './useCases/get-all-incident/get-all-incident-use-case';
import { UpdateIncidentUseCase } from './useCases/update-incident/update-incident-use-case';
import { DeleteIncidentUseCase } from './useCases/delete-incident/delete-incident-use-case';
import { GetIncidentUseCase } from './useCases/get-incident/get-incident-use-case';

@Module({
  imports: [],
  controllers: [IncidentsController],
  providers: [
    {
      provide: 'IncidentsRepository',
      useClass: IncidentsPrismaRepository,
    },
    CreateIncidentUseCase,
    GetAllIncidentUseCase,
    GetIncidentUseCase,
    UpdateIncidentUseCase,
    DeleteIncidentUseCase,
  ],
})
export class IncidentsModule {}
