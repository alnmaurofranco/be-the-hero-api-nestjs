import { Injectable, Inject } from '@nestjs/common';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { DeleteIncidentException } from './delete-incident-exception';

type DeleteIncidentUseCaseRequest = {
  incidentId: string;
};

type DeleteIncidentUseCaseResponse = void;

@Injectable()
export class DeleteIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    incidentId,
  }: DeleteIncidentUseCaseRequest): Promise<DeleteIncidentUseCaseResponse> {
    const incidentExists = await this.incidentsRepository.findById(incidentId);

    if (!incidentExists) {
      throw new DeleteIncidentException.NotFoundIncidentError();
    }

    await this.incidentsRepository.delete(incidentExists);
  }
}
