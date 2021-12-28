import { Inject, Injectable } from '@nestjs/common';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { CreateIncidentDto } from '../../dtos/create-incident.dto';
import { Incident } from '../../domain/incident';

type CreateIncidentUseCaseRequest = CreateIncidentDto;

type CreateIncidentUseCaseResponse = void;

@Injectable()
export class CreateIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    title,
    description,
    value,
    ongId,
  }: CreateIncidentUseCaseRequest): Promise<CreateIncidentUseCaseResponse> {
    const incident = { title, description, value, ongId };

    await this.incidentsRepository.create(incident);
  }
}
