import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteIncidentException } from './delete-incident-exception';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';

type DeleteIncidentUseCaseRequest = {
  incidentId: string;
  ongId?: string;
};

type DeleteIncidentUseCaseResponse = void;

@Injectable()
export class DeleteIncidentUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    ongId,
    incidentId,
  }: DeleteIncidentUseCaseRequest): Promise<DeleteIncidentUseCaseResponse> {
    const ongExists = await this.ongsRepository.findById(ongId);
    const incidentExists = await this.incidentsRepository.findById(incidentId);

    if (!ongExists || !incidentExists) {
      throw new DeleteIncidentException.NotFoundIncidentError();
    }

    const ongNotAdmin = ongExists.isAdmin === false;
    const incidentHasOngId = incidentExists.ongId;

    if (ongNotAdmin && ongId !== incidentHasOngId) {
      throw new DeleteIncidentException.OngNotAllowedForbiddenException();
    }

    await this.incidentsRepository.delete(incidentExists);
  }
}
