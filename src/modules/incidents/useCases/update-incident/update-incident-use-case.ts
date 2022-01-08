import { Injectable, Inject } from '@nestjs/common';
import { IIncidentsRepository } from '@modules/incidents/repositories/incidents-repository.interface';
import { UpdateIncidentDto } from '../../dtos/update-incident.dto';
import { UpdateIncidentException } from './update-incident-exception';
import { IOngsRepository } from '@modules/ongs/repositories/ongs-repository.interface';

type UpdateIncidentUseCaseRequest = UpdateIncidentDto & {
  incidentId: string;
};

type UpdateIncidentUseCaseResponse = void;

@Injectable()
export class UpdateIncidentUseCase {
  constructor(
    @Inject('OngsRepository')
    private readonly ongsRepository: IOngsRepository,
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
    const ongExists = await this.ongsRepository.findById(ongId);
    const incidentExists = await this.incidentsRepository.findById(incidentId);

    if (!ongExists || !incidentExists) {
      throw new UpdateIncidentException.NotFoundIncidentError();
    }

    const ongNotAdmin = ongExists.isAdmin === false;
    const incidentHasOngId = incidentExists.ongId;

    if (ongNotAdmin && ongId !== incidentHasOngId) {
      throw new UpdateIncidentException.OngNotAllowedForbiddenException();
    }

    incidentExists.title = title || incidentExists.title;
    incidentExists.description = description || incidentExists.description;
    incidentExists.value = value || incidentExists.value;

    await this.incidentsRepository.save(incidentExists);
  }
}
