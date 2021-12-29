import { Injectable, Inject } from '@nestjs/common';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { UpdateIncidentDto } from '../../dtos/update-incident.dto';
import { UpdateIncidentException } from './update-incident-exception';

type UpdateIncidentUseCaseRequest = UpdateIncidentDto & {
  incidentId: string;
};

type UpdateIncidentUseCaseResponse = void;

@Injectable()
export class UpdateIncidentUseCase {
  constructor(
    @Inject('IncidentsRepository')
    private readonly incidentsRepository: IIncidentsRepository,
  ) {}

  async execute({
    incidentId,
    title,
    description,
    value,
    ongId,
  }: UpdateIncidentUseCaseRequest): Promise<UpdateIncidentUseCaseResponse> {
    const incidentsExists = await this.incidentsRepository.findById(incidentId);

    if (!incidentsExists) {
      throw new UpdateIncidentException.NotFoundIncidentError();
    }

    if (ongId !== incidentsExists.ongId) {
      throw new UpdateIncidentException.OngNotAllowedForbiddenException();
    }

    incidentsExists.title = title || incidentsExists.title;
    incidentsExists.description = description || incidentsExists.description;
    incidentsExists.value = value || incidentsExists.value;

    await this.incidentsRepository.save(incidentsExists);
  }
}
