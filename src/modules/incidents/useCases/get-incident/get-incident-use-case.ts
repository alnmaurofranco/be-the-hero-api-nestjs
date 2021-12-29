import { Injectable, Inject } from '@nestjs/common';
import { IIncidentsRepository } from '../../repositories/incidents-repository.interface';
import { GetIncidentException } from '../../useCases/get-incident/get-incident-exception';
import { Incident } from '../../domain/incident';

type GetIncidentUseCaseRequest = {
  incidentId: string;
};

type GetIncidentUseCaseResponse = Incident;

@Injectable()
export class GetIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    incidentId,
  }: GetIncidentUseCaseRequest): Promise<GetIncidentUseCaseResponse> {
    const incidentExists = await this.incidentsRepository.findById(incidentId);

    if (!incidentExists) {
      throw new GetIncidentException.NotFoundIncidentError();
    }

    return incidentExists;
  }
}
