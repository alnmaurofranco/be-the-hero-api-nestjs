import { Module } from '@nestjs/common';
import { IncidentsController } from './http/controller/incidents.controller';
import { IncidentsPrismaRepository } from './repositories/prisma/incidents-prisma-repository';
import { CreateIncidentUseCase } from '@modules/incidents/useCases/create-incident/create-incident-use-case';

@Module({
  imports: [],
  controllers: [IncidentsController],
  providers: [
    {
      provide: 'IncidentsRepository',
      useClass: IncidentsPrismaRepository,
    },
    CreateIncidentUseCase,
  ],
})
export class IncidentsModule {}
