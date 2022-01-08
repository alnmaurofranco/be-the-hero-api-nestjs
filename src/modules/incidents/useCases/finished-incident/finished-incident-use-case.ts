import { Injectable, Inject } from '@nestjs/common';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';
import { FinishedIncidentException } from './finished-incident-exception';

type FinishedIncidentUseCaseRequest = {
  ongId: string;
  incidentId: string;
};

type FinishedIncidentUseCaseResponse = void;

@Injectable()
export class FinishedIncidentUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    ongId,
    incidentId,
  }: FinishedIncidentUseCaseRequest): Promise<FinishedIncidentUseCaseResponse> {
    const ongExists = await this.ongsRepository.findById(ongId);
    const incidentExists = await this.incidentsRepository.findById(incidentId);

    if (!ongExists || !incidentExists) {
      throw new FinishedIncidentException.NotFoundIncidentError();
    }

    const ongNotAdmin = ongExists.isAdmin === false;
    const incidentHasOngId = incidentExists.ongId;

    if (ongNotAdmin && ongId !== incidentHasOngId) {
      throw new FinishedIncidentException.OngNotAllowedForbiddenException();
    }

    incidentExists.isFinished = true;
    incidentExists.updatedAt = new Date();

    await this.incidentsRepository.save(incidentExists);
  }
}
