import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteIncidentException } from './delete-incident-exception';

type DeleteIncidentUseCaseRequest = {
  incidentId: string;
  ongId?: string;
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
    ongId,
  }: DeleteIncidentUseCaseRequest): Promise<DeleteIncidentUseCaseResponse> {
    // const ongExists = await this.ongsRepository.findById();
    const incidentExists = await this.incidentsRepository.findById(incidentId);

    if (!incidentExists) {
      throw new DeleteIncidentException.NotFoundIncidentError();
    }

    // if (!ongExists.isAdmin) {
    //   if (ongId !== incidentExists.ongId) {
    //     throw new UnauthorizedException();
    //   }

    //   await this.incidentsRepository.delete(incidentExists);
    // }

    if (ongId !== incidentExists.ongId) {
      throw new DeleteIncidentException.OngNotAllowedForbiddenException();
    }

    await this.incidentsRepository.delete(incidentExists);
  }
}
